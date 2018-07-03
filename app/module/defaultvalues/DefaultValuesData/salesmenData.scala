package module.defaultvalues.DefaultValuesData

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait salesmenData {
    implicit val salesmen_d2m : DBObject => Map[String, JsValue] = { obj =>
        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "name" -> toJson(obj.getAs[String]("name").get),
            "description" -> toJson(obj.getAs[String]("description").get),
            "skills" -> toJson(obj.getAs[String]("skills").get),
            "motivation" -> toJson(obj.getAs[String]("motivation").get),
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }
}
