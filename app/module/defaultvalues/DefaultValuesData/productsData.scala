package module.defaultvalues.DefaultValuesData

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait productsData {
    implicit val product_m2d : DBObject => Map[String, JsValue] = { obj =>
        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "prod_code" -> toJson(obj.getAs[String]("prod_code").get),
            "prod_brand" -> toJson(obj.getAs[String]("prod_brand").get),
            "prod_name" -> toJson(obj.getAs[String]("prod_name").get),
            "prod_sales_time" -> toJson(obj.getAs[String]("prod_sales_time").get),
            "prod_unit_price" -> toJson(obj.getAs[String]("prod_unit_price").get),
            "prod_unit_cost" -> toJson(obj.getAs[String]("prod_unit_cost").get),
            "prod_insurance" -> toJson(obj.getAs[String]("prod_insurance").get),
            "prod_cat" -> toJson(obj.getAs[String]("prod_cat").get),
            "prod_competition" -> toJson(obj.getAs[String]("prod_competition").get),
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }
}
