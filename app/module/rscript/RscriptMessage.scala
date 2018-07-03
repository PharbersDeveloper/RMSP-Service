package module.rscript

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class MsgRscriptCommand extends CommonMessage("rscript", RscriptModule)

object RscriptMessage {
	
	case class MsgCallCalcRscript(data: JsValue) extends MsgRscriptCommand
	case class MsgCallWriteExcelRscript(data: JsValue) extends MsgRscriptCommand
}
