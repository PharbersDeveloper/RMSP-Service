package module.defaultvalues.DefaultValuesData

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait hospitalData {
    implicit val hospital_d2m : DBObject => Map[String, JsValue] = { obj =>
        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "hosp_name" -> toJson(obj.getAs[String]("hosp_name").get),
            "hosp_code" -> toJson(obj.getAs[String]("hosp_code").get),
            "hosp_area" -> toJson(obj.getAs[String]("hosp_area").get),
            "hosp_cat" -> toJson(obj.getAs[String]("hosp_cat").get),
    
            "create_time" -> toJson(obj.getAs[String]("create_time").get),
            "type" -> toJson(obj.getAs[String]("type").get),
            "bed_number" -> toJson(obj.getAs[String]("bed_number").get),
            "department" -> toJson(obj.getAs[String]("department").get),
            "pay_power" -> toJson(obj.getAs[String]("pay_power").get),
            "dynamic" -> toJson(obj.getAs[String]("dynamic").get),
            
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }

    implicit val hospital_potential_d2m : DBObject => Map[String, JsValue] = { obj =>
        
        val hc = obj.getAs[MongoDBObject]("_id").get.getAs[String]("hc").get
        val lst = obj.getAs[MongoDBObject]("value").get

        def d2m_acc(v : MongoDBObject) : Map[String, JsValue] = {
            if (v.isEmpty) Map.empty
            else {
                val tmp = v.head
                Map(tmp._1 -> toJson(tmp._2.toString)) ++ d2m_acc(v.tail)
            }
        }

        Map(
            "hosp_code" -> toJson(hc)
        ) ++ d2m_acc(lst)
    }
    
    val hospital_constrats_d2m: DBObject => String Map JsValue = { obj =>
        Map(
            "hosp_code" -> toJson(obj.getAs[String]("hosp_code")),
            "prod_code" -> toJson(obj.getAs[String]("prod_code")),
            "phrase_1" -> toJson(obj.getAs[String]("phrase_1")),
            "phrase_2" -> toJson(obj.getAs[String]("phrase_2"))
        )
    }
}
