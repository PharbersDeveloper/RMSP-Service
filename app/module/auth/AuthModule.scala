package module.auth

import java.util.Date

import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import com.pharbers.common.MergeStepResult
import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.token.AuthTokenTrait
import module.auth.AuthData.AuthData
import module.auth.AuthMessage._
import play.api.libs.json.JsValue
import play.api.libs.json.Json._

object AuthModule extends ModuleTrait with AuthData {
	def dispatchMsg(msg: MessageDefines)
	               (pr: Option[String Map JsValue])
	               (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {
		case MsgUserWithPassword(data) => authWithPassword(data)
		case MsgAuthTokenParser(data) => auth_token_parser(data)
		case MsgAuthTokenExpire(data) => auth_token_expire(data)(pr)
 		case _ => throw new Exception("function is not impl")
	}
	
	def authWithPassword(data: JsValue)(implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val att = cm.modules.get.get("att").map(x => x.asInstanceOf[AuthTokenTrait]).getOrElse(throw new Exception("no encrypt impl"))
			val date = new Date().getTime
			val o = m2d(data)
			db.queryObject(o, "register") match {
				case None => throw new Exception("data not exist")
				case Some(d) =>
					val reVal = d + ("expire_in" -> toJson(date + 60 * 60 * 1000 * 24))
					val auth_token = att.encrypt2Token(toJson(reVal))
					(Some(Map("user_token" -> toJson(auth_token), "user" -> toJson((data \ "condition" \ "account").as[String]))), None)
			}
		} catch {
			case ex: Exception =>
				(None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def auth_token_parser(data : JsValue)(implicit cm : CommonModules) : (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val att = cm.modules.get.get("att").map(x => x.asInstanceOf[AuthTokenTrait]).getOrElse(throw new Exception("no encrypt impl"))
			val user_token = (data \ "user_token").asOpt[String].getOrElse(throw new Exception("no user token"))
			val user = att.decrypt2JsValue(user_token)
			(Some(Map("user_token" -> toJson(user))), None)
		}catch {
			case ex : Exception =>
				println(ex)
				(None , Some(ErrorCode.errorToJson((ex.getMessage))))
		}
	}
	
	def auth_token_expire(data : JsValue)
						 (pr: Option[Map[String, JsValue]])
						 (implicit  cm : CommonModules) : (Option[String Map JsValue], Option[JsValue]) = {
		try{
			val reVal = (MergeStepResult(data, pr) \ "user_token" \ "expire_in").asOpt[Long].getOrElse(throw new Exception("no expire time"))
			val recentTime = new Date().getTime()
			if(reVal < recentTime) throw new Exception("token expired")
			else (pr, None)
		}catch {
			case ex: Exception =>
				println(ex)
				(None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
		
	}
	
}