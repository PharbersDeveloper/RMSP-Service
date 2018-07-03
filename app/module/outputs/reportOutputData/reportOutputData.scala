package module.outputs.reportOutputData

import java.util.Date

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait reportOutputData {
    implicit val m2d : JsValue => DBObject = { mm =>
        val builder = MongoDBObject.newBuilder

        builder += "date" -> new Date().getTime
        builder.result
    }

    lazy val tb : List[(String, BasicDBObject => Map[String, JsValue])] =
        "市场销售报告_商业价值" ->
            { tmp : BasicDBObject =>
                Map(
                    "general_names" -> toJson(tmp.getAs[String]("general_names").get),
                    "phase0" -> toJson(tmp.getAs[Number]("phase0").get.intValue),
                    "phase1" -> toJson(tmp.getAs[Number]("phase1").get.intValue),
                    "phase2" -> toJson(tmp.getAs[Number]("phase2").get.intValue)
                )
            } ::
        "市场销售报告_销售业绩" ->
            { tmp : BasicDBObject =>
                Map(
                    "hosp_name" -> toJson(tmp.getAs[String]("hosp_name").get),
                    "last_total_revenue" -> toJson(tmp.getAs[Number]("last_total_revenue").get.intValue),
                    "current_total_revenue" -> toJson(tmp.getAs[Number]("current_total_revenue").get.intValue)
                )
            } ::
        "代表报告_时间分配" ->
            { tmp : BasicDBObject =>
                Map(
                    "general_names" -> toJson(tmp.getAs[String]("general_names").get),
                    "salesmen_first" -> toJson(tmp.getAs[Number]("salesmen_first").get.intValue),
                    "salesmen_second" -> toJson(tmp.getAs[Number]("salesmen_second").get.intValue),
                    "salesmen_third" -> toJson(tmp.getAs[Number]("salesmen_third").get.intValue),
                    "salesmen_fourth" -> toJson(tmp.getAs[Number]("salesmen_fourth").get.intValue),
                    "salesmen_fifth" -> toJson(tmp.getAs[Number]("salesmen_fifth").get.intValue)
                )
            } ::
        "代表报告_产品知识" ->
            { tmp : BasicDBObject =>
                Map(
                    "general_names" -> toJson(tmp.getAs[String]("general_names").get),
                    "salesmen_first" -> toJson(tmp.getAs[Number]("salesmen_first").get.intValue),
                    "salesmen_second" -> toJson(tmp.getAs[Number]("salesmen_second").get.intValue),
                    "salesmen_third" -> toJson(tmp.getAs[Number]("salesmen_third").get.intValue),
                    "salesmen_fourth" -> toJson(tmp.getAs[Number]("salesmen_fourth").get.intValue),
                    "salesmen_fifth" -> toJson(tmp.getAs[Number]("salesmen_fifth").get.intValue)
                )
            } ::
        "代表报告_经验" ->
            { tmp : BasicDBObject =>
                Map(
                    "general_names" -> toJson(tmp.getAs[String]("general_names").get),
                    "salesmen_first" -> toJson(tmp.getAs[Number]("salesmen_first").get.doubleValue),
                    "salesmen_second" -> toJson(tmp.getAs[Number]("salesmen_second").get.doubleValue),
                    "salesmen_third" -> toJson(tmp.getAs[Number]("salesmen_third").get.doubleValue),
                    "salesmen_fourth" -> toJson(tmp.getAs[Number]("salesmen_fourth").get.doubleValue),
                    "salesmen_fifth" -> toJson(tmp.getAs[Number]("salesmen_fifth").get.doubleValue)

                )
            } ::
        "代表报告_销售技巧" ->
            { tmp : BasicDBObject =>
                Map(
                    "general_names" -> toJson(tmp.getAs[String]("general_names").get),
                    "salesmen_first" -> toJson(tmp.getAs[Number]("salesmen_first").get.intValue),
                    "salesmen_second" -> toJson(tmp.getAs[Number]("salesmen_second").get.intValue),
                    "salesmen_third" -> toJson(tmp.getAs[Number]("salesmen_third").get.intValue),
                    "salesmen_fourth" -> toJson(tmp.getAs[Number]("salesmen_fourth").get.intValue),
                    "salesmen_fifth" -> toJson(tmp.getAs[Number]("salesmen_fifth").get.intValue)
                )
            } ::
        "代表报告_工作积极性" ->
            { tmp : BasicDBObject =>
                Map(
                    "general_names" -> toJson(tmp.getAs[String]("general_names").get),
                    "salesmen_first" -> toJson(tmp.getAs[Number]("salesmen_first").get.intValue),
                    "salesmen_second" -> toJson(tmp.getAs[Number]("salesmen_second").get.intValue),
                    "salesmen_third" -> toJson(tmp.getAs[Number]("salesmen_third").get.intValue),
                    "salesmen_fourth" -> toJson(tmp.getAs[Number]("salesmen_fourth").get.intValue),
                    "salesmen_fifth" -> toJson(tmp.getAs[Number]("salesmen_fifth").get.intValue)
                )
            } ::
        "经理报告_职员成本" ->
            { tmp : BasicDBObject =>
                Map(
                    "salesmen" -> toJson(tmp.getAs[String]("salesmen").get),
                    "bonus" -> toJson(tmp.getAs[Number]("bonus").get.intValue)
                )
            } ::
        "经理报告_时间分配" ->
            { tmp : BasicDBObject =>
                Map(
                    "general_names" -> toJson(tmp.getAs[String]("general_names").get),
                    "values" -> toJson(tmp.getAs[Number]("values").get.doubleValue)
                )
            } ::
        "分配报告_资源分配" ->
            { tmp : BasicDBObject =>
                Map(
                    "hosp_name" -> toJson(tmp.getAs[String]("hosp_name").get),
                    "factor" -> toJson(tmp.getAs[String]("factor").get),
                    "product_first" -> toJson(tmp.getAs[String]("product_first").get),
                    "product_second" -> toJson(tmp.getAs[String]("product_second").get),
                    "product_third" -> toJson(tmp.getAs[String]("product_third").get),
                    "product_fourth" -> toJson(tmp.getAs[String]("product_fourth").get),
                    "overall" -> toJson(tmp.getAs[String]("overall").get)
                )
            } ::
        "销售报告_销售额每客户" ->
             { tmp : BasicDBObject =>
                Map(
                    "hosp_name" -> toJson(tmp.getAs[String]("hosp_name").get),
                    "prod_name" -> toJson(tmp.getAs[String]("prod_name").get),
                    "current_target" -> toJson(tmp.getAs[Number]("current_target").get.intValue),
                    "last_revenue" -> toJson(tmp.getAs[Number]("last_revenue").get.intValue),
                    "current_revenue" -> toJson(tmp.getAs[Number]("current_revenue").get.intValue),
                    "increase_revenue" -> toJson(tmp.getAs[Number]("increase_revenue").get.intValue),
                    "increase_ratio" -> toJson(tmp.getAs[Number]("increase_ratio").map (x => x.doubleValue).getOrElse(0.0)),
                    "target_realization" -> toJson(tmp.getAs[Number]("target_realization").map (x => x.doubleValue).getOrElse(0.0))
                )
            } ::
        "销售报告_销售额每代表" ->
            { tmp : BasicDBObject =>
                Map(
                    "salesmen" -> toJson(tmp.getAs[String]("salesmen").get),
                    "prod_name" -> toJson(tmp.getAs[String]("prod_name").get),
                    "current_target" -> toJson(tmp.getAs[Number]("current_target").get.intValue),
                    "last_revenue" -> toJson(tmp.getAs[Number]("last_revenue").get.intValue),
                    "current_revenue" -> toJson(tmp.getAs[Number]("current_revenue").get.intValue),
                    "target_realization" -> toJson(tmp.getAs[Number]("target_realization").map (x => x.doubleValue).getOrElse(0.0))
                )
            } ::
        "销售报告_销售额每产品" ->
            { tmp : BasicDBObject =>
                Map(
                    "prod_name" -> toJson(tmp.getAs[String]("prod_name").get),
                    "current_target" -> toJson(tmp.getAs[Number]("current_target").get.intValue),
                    "last_revenue" -> toJson(tmp.getAs[Number]("last_revenue").get.intValue),
                    "current_revenue" -> toJson(tmp.getAs[Number]("current_revenue").get.intValue),
                    "increase_revenue" -> toJson(tmp.getAs[Number]("increase_revenue").get.intValue),
                    "increase_ratio" -> toJson(tmp.getAs[Number]("increase_ratio").map (x => x.doubleValue).getOrElse(0.0)),
                    "target_realization" -> toJson(tmp.getAs[Number]("target_realization").map (x => x.doubleValue).getOrElse(0.0))
                )
            } ::
        Nil


    implicit val d2m : DBObject => Map[String, JsValue] = { obj =>

        val report = obj.getAs[MongoDBList]("report").get.toList.asInstanceOf[List[BasicDBObject]]

        val report_map = report.map { iter =>
            val report_name = iter.getAs[String]("report_name").get

            val result = iter.getAs[MongoDBList]("result").get.toList.asInstanceOf[List[BasicDBObject]]

            val result_map = result map (tb.find(p => p._1 == report_name).get._2)

            Map(
                "phase" -> toJson(iter.getAs[Number]("phase").get.intValue),
                "report_name" -> toJson(report_name),
                "result" -> toJson(result_map)
            )
        }

        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "user_id" -> toJson(obj.getAs[String]("user_id").get),
            "uuid" -> toJson(obj.getAs[String]("uuid").get),
            "report" -> toJson(report_map)
//            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }
}
