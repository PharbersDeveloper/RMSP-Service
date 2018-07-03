package module.inputs.userInputData

import java.util.Date

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait userInputData {
    implicit val decision_m2d : JsValue => DBObject = { mm =>
        val builder = MongoDBObject.newBuilder

        builder += "user_id" -> (mm \ "user_id").asOpt[String].get
        builder += "uuid" -> (mm \ "uuid").asOpt[String].get

        val dd = (mm \ "decision").asOpt[List[JsValue]].get
        val dst = MongoDBList.newBuilder

        dd.map { d =>
            val tmp = MongoDBObject.newBuilder
            tmp += "hosp_code" -> (d \ "hosp_code").asOpt[Int].get
            tmp += "hosp_name" -> (d \ "hosp_name").asOpt[String].map (x => x).getOrElse("")
            tmp += "phase" -> (d \ "phase").asOpt[Int].map (x => x).getOrElse(1)
            tmp += "budget" -> (d \ "budget").asOpt[Double].map (x => x).getOrElse(0.0)
            tmp += "salesmen" -> (d \ "salesmen").asOpt[String].map (x => x).getOrElse("")

            val ss = (d \ "sales").asOpt[List[JsValue]].get
            val sales_lst = MongoDBList.newBuilder
            ss map { s =>
                val tmp_ss = MongoDBObject.newBuilder
                tmp_ss += "prod_name" -> (s \ "prod_name").asOpt[String].get
                tmp_ss += "prod_value" -> (s \ "prod_value").asOpt[Double].get

                sales_lst += tmp_ss.result
            }
            tmp += "sales" -> sales_lst.result

            val vv = (d \ "visit_hours").asOpt[List[JsValue]].get
            val vh_lst = MongoDBList.newBuilder
            vv map { v =>
                val tmp_vv = MongoDBObject.newBuilder
                tmp_vv += "prod_name" -> (v \ "prod_name").asOpt[String].get
                tmp_vv += "prod_hours" -> (v \ "prod_hours").asOpt[Double].get

                vh_lst += tmp_vv.result
            }
            tmp += "visit_hours" -> vh_lst.result

            dst += tmp.result
        }
        builder += "decision" -> dst.result

        builder += "date" -> new Date().getTime
        builder.result
    }

    implicit val decision_d2m : DBObject => Map[String, JsValue] = { obj =>

        val decisions = obj.getAs[MongoDBList]("decision").get.toList.asInstanceOf[List[BasicDBObject]]

        val map_decision = decisions map { d =>
            val sales = d.getAs[MongoDBList]("sales").get.toList.asInstanceOf[List[BasicDBObject]]

            val map_sales = sales map { s =>
                Map(
                    "prod_name" -> toJson(s.getAs[String]("prod_name").get),
                    "prod_value" -> toJson(s.getAs[Number]("prod_value").get.doubleValue)
                )
            }

            val visits = d.getAs[MongoDBList]("visit_hours").get.toList.asInstanceOf[List[BasicDBObject]]

            val map_visits = visits map { s =>
                Map(
                    "prod_name" -> toJson(s.getAs[String]("prod_name").get),
                    "prod_hours" -> toJson(s.getAs[Number]("prod_hours").get.doubleValue)
                )
            }

            Map(
                "hosp_code" -> toJson(d.getAs[Number]("hosp_code").get.intValue),
                "hosp_name" -> toJson(d.getAs[String]("hosp_name").get),
                "phase" -> toJson(d.getAs[Number]("phase").get.intValue),
                "budget" -> toJson(d.getAs[Number]("budget").get.doubleValue),
                "salesmen" -> toJson(d.getAs[String]("salesmen").get),
                "sales" -> toJson(map_sales),
                "visit_hours" -> toJson(map_visits)
            )
        }

        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "user_id" -> toJson(obj.getAs[String]("user_id").get),
            "uuid" -> toJson(obj.getAs[String]("uuid").get),
            "decision" -> toJson(map_decision),
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }
}
