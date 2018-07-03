package module.outputs

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class reportOutputMessage extends CommonMessage("report output", reportOutputModule)

object reportOutputMessages {
    case class reportFinishedPhaseCount(date : JsValue) extends reportOutputMessage
    case class reportLastFinishedPhase(date : JsValue) extends reportOutputMessage
    case class reportDataInOpPhase(date : JsValue) extends reportOutputMessage
}