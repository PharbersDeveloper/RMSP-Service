package module.defaultvalues.DefaultValuesData

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait budgetData {
    implicit val budget_d2m : DBObject => Map[String, JsValue] = { obj =>
        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "one_product_budget" -> toJson(obj.getAs[String]("one_product_budget").get),
            "budget" -> toJson(obj.getAs[String]("budget").get)
        )
    }
}
