package module.checkstatus

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class MsgRscriptCommand extends CommonMessage("phasestatus", CheckStatusModule)

object CheckStatusMessage {
	case class MsgCheckStatus(data: JsValue) extends MsgRscriptCommand
}
