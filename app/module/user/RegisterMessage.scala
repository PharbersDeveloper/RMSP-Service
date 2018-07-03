 package module.user

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue


abstract class MsgRegisterCommand extends CommonMessage("register", RegisterModule)
object RegisterMessage {
	
	case class MsgCheckRepeatRegisterUser(data: JsValue) extends MsgRegisterCommand
	case class MsgCheckRepeatRegisterUserAccount(data: JsValue) extends MsgRegisterCommand
	case class MsgCheckRepeatRegisterUserEmail(data: JsValue) extends MsgRegisterCommand
	case class MsgCheckRepeatRegisterUserPhone(data: JsValue) extends MsgRegisterCommand
	
	case class MsgRegisterUser(data: JsValue) extends MsgRegisterCommand
	
}
