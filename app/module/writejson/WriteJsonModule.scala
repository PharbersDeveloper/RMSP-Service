package module.writejson

import java.util.UUID

import com.mongodb.DBObject
import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import com.pharbers.dbManagerTrait.dbInstanceManager
import module.writejson.WriteJsonData._
import module.writejson.WriteJsonMessage._
import play.api.libs.json.{JsObject, JsValue, Json}
import play.api.libs.json.Json._

object WriteJsonModule extends ModuleTrait with WriteJsonData  with JMap{
	def dispatchMsg(msg: MessageDefines)
				   (pr: Option[String Map JsValue])
				   (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {
		case WriterJsonData(data) => writeJsonWithFile(data)
		case _ => throw new Exception("function is not impl")
	}

	def writeJsonWithFile(data: JsValue)(implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
//			implicit val func = HandleImpl.j2s
			val connection = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).getOrElse(throw new Exception("no db connection"))
			val db = connection.queryDBInstance("stp").get
			val uuid = UUID.randomUUID().toString
			val user = (data \ "user_name" ).get.head.as[String]
			val phase = (data \ "phase").get.head.as[Int].toString
			val js : DBObject= toJson(Map("fileKey"-> toJson(uuid) , "value" -> data))
			db.insertObject(js , "jsonMsg","fileKey")
			val reportFileName = s"${UUID.randomUUID().toString}.xlsx"
			(Some(Map("data" -> toJson(Map("flag" -> toJson(true), "fileKey" -> toJson(uuid), "reportfilename" -> toJson(reportFileName))),
				"reportfilename" -> toJson(reportFileName), "user"-> toJson(user),"phase"->toJson(phase))), None)
		} catch {
			case ex: Exception =>
				println("writeJsonWithFile"+ex)
				(None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
}
