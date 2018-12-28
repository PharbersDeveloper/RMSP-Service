package module.generatepdf

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class MsgGeneratePDFCommand extends CommonMessage("generatepdf", GeneratePDFModule)

object GeneratePDFMessage {
	case class MsgGeneratePDF(data: JsValue) extends MsgGeneratePDFCommand
}
