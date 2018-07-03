package module.rscript

import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import com.pharbers.common.RConfig
import com.pharbers.common.cmd.rcmd.CallRFile2
import module.rscript.RscriptData.RscriptData
import module.rscript.RscriptMessage._
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

object RscriptModule extends ModuleTrait {
	
	def dispatchMsg(msg: MessageDefines)
	               (pr: Option[String Map JsValue])
	               (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {
		case MsgCallCalcRscript(data) => callCalcRscript(data)
		case MsgCallWriteExcelRscript(data) => callWriteExcelRscript(data)
	}
	
	def callCalcRscript(data: JsValue)(implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val uuid = (data \ "condition" \ "uuid").asOpt[String].map(x => x).getOrElse(throw new Exception("wrong input"))
			val phase = (data \ "phase").asOpt[Int].map(x => x).getOrElse(throw new Exception("wrong input"))
			val rfile = RConfig().program_path + RConfig().rfile()
			val r = CallRFile2(rfile, uuid, phase).excute
			(Some(Map("data" -> toJson("success"))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def callWriteExcelRscript(data: JsValue)(implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val uuid = (data \ "condition" \ "uuid").asOpt[String].map(x => x).getOrElse(throw new Exception("wrong input"))
			val phase = (data \ "condition" \ "phase").asOpt[Int].map(x => x).getOrElse(throw new Exception("wrong input"))
			val rfile = RConfig().program_path + RConfig().report_path
			val r = CallRFile2(rfile, uuid, phase).excute
			(Some(Map("data" -> toJson(Map("flag" -> "ok", "path" -> (r \ "result" \ "result").as[String].split("\\s")(1).replace(""""""", "") )))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	
}
