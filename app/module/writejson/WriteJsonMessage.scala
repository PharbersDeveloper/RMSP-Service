package module.writejson

import com.pharbers.bmmessages.CommonMessage
import play.api.libs.json.JsValue

abstract class MsgWriteJsonCommand extends CommonMessage("writejson", WriteJsonModule)
object WriteJsonMessage {
	case class WriterJsonData(data: JsValue) extends MsgWriteJsonCommand
}
