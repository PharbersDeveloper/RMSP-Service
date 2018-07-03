package module.outputs.reportOutputData

import com.mongodb.casbah.Imports._
import play.api.libs.json.JsValue

trait reportOutputCondition {
    implicit val dc : JsValue => DBObject = { mm =>
        val uuidOp = (mm \ "condition" \ "uuid").asOpt[String].map (x => Some(DBObject("uuid" -> x))).getOrElse(None)
        val userOp = (mm \ "condition" \ "user_id").asOpt[String].map (x => Some(DBObject("user_id" -> x))).getOrElse(None)

        if (uuidOp.isEmpty && userOp.isEmpty) DBObject()
        else if (uuidOp.isEmpty) userOp.get
        else if (userOp.isEmpty) uuidOp.get
        else $and(userOp.get, uuidOp.get)
    }
}
