package module.defaultvalues

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class MsgDecisionCommand extends CommonMessage("default values", DefaultValuesModule)

object DefaultValuesMessages {
    case class salesMenInProposal(data: JsValue) extends MsgDecisionCommand
    case class productInProposal(data: JsValue) extends MsgDecisionCommand
    case class hospitalPotentialInProposal(data: JsValue) extends MsgDecisionCommand
    case class perResultInProposal(data: JsValue) extends MsgDecisionCommand

    case class budgetInProposal(data : JsValue) extends MsgDecisionCommand
}