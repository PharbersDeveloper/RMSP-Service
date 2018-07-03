package module.checkstatus

import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import module.checkstatus.CheckStatusMessage._
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

object CheckStatusModule extends ModuleTrait {
	def dispatchMsg(msg: MessageDefines)
	               (pr: Option[String Map JsValue])
	               (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {
			
		case MsgCheckStatus(data) => checkStatus(data)(pr)
	}
	
	def checkStatus(data: JsValue)(pr: Option[String Map JsValue])(implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
//			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).getOrElse(throw new Exception("no db connection"))
//			val db = conn.queryDBInstance("stp").get
			val phaseVal = pr.get("finished_phase").as[Int]
			val inputsVal = pr.get("finished_phase").as[Int] + 1
			(Some(Map("data" -> toJson(Map("flag" -> toJson("ok"), "phase" -> toJson(phaseVal), "inputs" -> toJson(inputsVal) )))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
}
