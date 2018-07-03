package module.inputs.userInputData

import java.util.Date

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait userManagementData {
    implicit val mag_m2d : JsValue => DBObject = { mm =>
        val builder = MongoDBObject.newBuilder

        builder += "user_id" -> (mm \ "user_id").asOpt[String].get
        builder += "uuid" -> (mm \ "uuid").asOpt[String].get

        val dd = (mm \ "management").asOpt[List[JsValue]].get
        val dst = MongoDBList.newBuilder

        dd.map { d =>
            val tmp = MongoDBObject.newBuilder
            tmp += "project_name" -> (d \ "project_name").asOpt[String].get
            tmp += "project_code" -> (d \ "project_code").asOpt[Int].get
            tmp += "phase" -> (d \ "phase").asOpt[Int].get

            val ap_lst = MongoDBList.newBuilder
            val pp = (d \ "apply").asOpt[List[JsValue]].get
            pp.map { p =>
                val ap_obj = MongoDBObject.newBuilder
                ap_obj += "personal" -> (p \ "personal").asOpt[String].get
                ap_obj += "days" -> (p \ "days").asOpt[Int].get

                ap_lst += ap_obj.result
            }
            tmp += "apply" -> ap_lst.result

            dst += tmp.result
        }
        builder += "management" -> dst.result

        builder += "date" -> new Date().getTime
        builder.result
    }

    implicit val mag_d2m : DBObject => Map[String, JsValue] = { obj =>

        val mag = obj.getAs[MongoDBList]("management").get.toList.asInstanceOf[List[BasicDBObject]]

        val mag_map = mag.map { x =>
            val ap = x.getAs[MongoDBList]("apply").get.toList.asInstanceOf[List[BasicDBObject]]
            val ap_map = ap.map { p =>
                Map(
                    "personal" -> toJson(p.getAs[String]("personal").get),
                    "days" -> toJson(p.getAs[Number]("days").get.intValue)
                )
            }

            Map(
                "project_name" -> toJson(x.getAs[String]("project_name").get),
                "project_code" -> toJson(x.getAs[Number]("project_code").get.intValue),
                "phase" -> toJson(x.getAs[Number]("phase").map (x => x.intValue).getOrElse(1)),
                "apply" -> toJson(ap_map)
            )
        }

        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "user_id" -> toJson(obj.getAs[String]("user_id").get),
            "uuid" -> toJson(obj.getAs[String]("uuid").get),
            "management" -> toJson(mag_map),
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }
}
