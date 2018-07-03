package module.auth

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class MsgAuthCommand extends CommonMessage("auth", AuthModule)

object AuthMessage {
	case class MsgUserWithPassword(data: JsValue) extends MsgAuthCommand
	case class MsgAuthTokenParser(data: JsValue) extends MsgAuthCommand
	case class MsgAuthTokenExpire(data: JsValue) extends MsgAuthCommand
}
