package module.user.RegisterData

import java.util.Date

import com.mongodb.casbah.Imports.{DBObject, _}
import play.api.libs.json.JsValue
import play.api.libs.json.Json._


object State {
	sealed class UserState(val s: Boolean, val n: Int)
	case class UserNormal() extends UserState(true, 0)
	case class UserLocked() extends UserState(false, 1)
}

trait RegisterData {
	
	def validationUserRepeat(jv: JsValue, repeat :String): DBObject ={
		val builder = MongoDBObject.newBuilder
		builder += repeat -> (jv \ "user" \ repeat).asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder.result
	}
	
	def validationUser(jv: JsValue): DBObject ={
		val builder = MongoDBObject.newBuilder
		builder += "user" -> (jv \ "user" \ "account").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder.result
	}
	
	
	
	implicit val d2m: DBObject => String Map JsValue = { obj =>
		Map("user" -> toJson(obj.getAs[String]("user").getOrElse("")))
	}
	
	implicit val m2d: JsValue => DBObject = { jv =>
		val builder = MongoDBObject.newBuilder
		builder += "user" -> (jv \ "user" \ "account").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "name" -> (jv \ "user" \ "name").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "pw" -> (jv \ "user" \ "password").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "corperation" -> (jv \ "user" \ "company").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "department" -> (jv \ "user" \ "department").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "title" -> (jv \ "user" \ "position").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "phone" -> (jv \ "user" \ "phone").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "email" -> (jv \ "user" \ "email").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "age" -> (jv \ "user" \ "age").asOpt[String].getOrElse(throw new Exception("wrong input"))
		builder += "timestamp" -> (jv \ "user" \ "timestamp").asOpt[String].getOrElse(new Date().getTime.toString)
		builder += "locked_out" -> State.UserNormal().s
		builder += "times" -> 0
		builder.result
	}
}
