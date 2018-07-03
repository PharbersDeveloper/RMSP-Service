package module.inputs.userInputData

import com.mongodb.casbah.Imports._
import play.api.libs.json.JsValue

trait userInputCondition {
    implicit val dc : JsValue => DBObject = { data =>
        val user_id = (data \ "condition" \ "user_id").asOpt[String]
                        .map (x => Some(DBObject("user_id" -> x))).getOrElse(None)

        val uuid = (data \ "condition" \ "uuid").asOpt[String]
                        .map (x => Some(DBObject("uuid" -> x))).getOrElse(None)

        if (user_id.isEmpty && uuid.isEmpty) DBObject()
        else if (user_id.isEmpty) uuid.get
        else if (uuid.isEmpty) user_id.get
        else $and(user_id.get, uuid.get)
    }
}
