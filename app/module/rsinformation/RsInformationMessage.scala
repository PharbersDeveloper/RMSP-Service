package module.rsinformation
import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class MsgRsInformationCommand extends CommonMessage("information", RsInformationModel)

object RsInformationMessage {
	
	case class MsgGetHospitals(data: JsValue)  extends MsgRsInformationCommand
	
	case class MsgGetPhrase(data: JsValue) extends MsgRsInformationCommand
	
	case class MsgGetPreviousResult(data: JsValue) extends MsgRsInformationCommand
	
	case class MsgGenerateHospitalFile(data: JsValue) extends MsgRsInformationCommand
	
	case class MsgSalesMenRadarMap(data: JsValue) extends MsgRsInformationCommand
}
