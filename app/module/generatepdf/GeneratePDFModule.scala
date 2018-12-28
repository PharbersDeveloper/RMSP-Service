package module.generatepdf

import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import com.pharbers.common.PDFConfig
import com.pharbers.common.cmd.wkhtmltopdf.CallPDF
import module.generatepdf.GeneratePDFMessage.MsgGeneratePDF
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

object GeneratePDFModule extends ModuleTrait{
	def dispatchMsg(msg: MessageDefines)
	               (pr: Option[String Map JsValue])
	               (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {
		case MsgGeneratePDF(data) => callPDF(data)
		case _ => ???
	}
	
	def callPDF(data: JsValue)(implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val uuid = (data \ "condition" \ "uuid").asOpt[String].map(x => x).getOrElse(throw new Exception("wrong input"))
			val host = (data \ "condition" \ "host").asOpt[String].map(x => x).getOrElse(throw new Exception("wrong input"))
			val pdfPath = PDFConfig().pdf_path
			CallPDF(host, uuid, s"$pdfPath/$uuid.pdf").excute
			
			(Some(Map("data" -> toJson("success"))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
}
