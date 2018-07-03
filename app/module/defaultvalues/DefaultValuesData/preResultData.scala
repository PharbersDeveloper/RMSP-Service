package module.defaultvalues.DefaultValuesData

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

trait preResultData {
    implicit val d2m_stage_1 : DBObject => Map[String, JsValue] = { obj =>

        val stages = obj.getAs[MongoDBList]("pre_result").get.toList.asInstanceOf[List[BasicDBObject]]
        val stage = stages.find(p => p.get("stage") == 1).get

        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "hosp_code" -> toJson(obj.getAs[String]("hosp_code").get.toString),
            "phrase" -> toJson(stage.getAs[String]("phrase_1").get.toString),
            "total" -> toJson(stage.getAs[String]("total").get.toString),
            "1" -> toJson(stage.getAs[String]("1").get.toString),
            "2" -> toJson(stage.getAs[String]("2").get.toString),
            "3" -> toJson(stage.getAs[String]("3").get.toString),
            "4" -> toJson(stage.getAs[String]("4").get.toString),
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }

    implicit val d2m_stage_2 : DBObject => Map[String, JsValue] = { obj =>

        val stages = obj.getAs[MongoDBList]("pre_result").get.toList.asInstanceOf[List[BasicDBObject]]
        val stage = stages.find(p => p.get("stage") == 2).get

        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "hosp_code" -> toJson(obj.getAs[String]("hosp_code").get.toString),
            "phrase" -> toJson(stage.getAs[String]("phrase_2").get.toString),
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }
	
	
	def d2m_hospdata_stage(obj: DBObject, phase: Int): String Map JsValue = {
		
		val stages = obj.getAs[MongoDBList]("pre_result").get.toList.asInstanceOf[List[BasicDBObject]]
		val stage = stages.find(p => p.get("stage") == phase).get
		
		Map(
			"_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
			"hosp_code" -> toJson(obj.getAs[String]("hosp_code").get.toString),
			"phrase" -> toJson(stage.getAs[String](s"phrase_$phase").get.toString),
			"date" -> toJson(obj.getAs[Number]("date").get.longValue)
		)
	}
    
    
    def d2m_predata_stage(o: DBObject): String Map JsValue = {
     
	    val hospitalList = ("人民医院" :: "军区医院" :: "中日医院" :: "铁路医院" :: "海港医院" :: "第六医院" :: "小营医院" :: "西河医院" :: "光华医院" :: "大学医院" :: Nil).zipWithIndex.map(x => Map("hosp_name" -> x._1, "hosp_code" -> (x._2 + 1).toString))
	    
	    val reportMap = o.getAs[MongoDBList]("report").get.toList.asInstanceOf[List[BasicDBObject]].find(o => o.get("report_name") == "销售报告_销售额每客户").get.getAs[List[DBObject]]("result").get.map { obj =>
		    Map("hosp_name" -> obj.getAs[String]("hosp_name").get,
			    "hosp_code" -> hospitalList.find(f => f("hosp_name") == obj.getAs[String]("hosp_name").get).get("hosp_code"),
		        "prod_name" -> obj.getAs[String]("prod_name").get,
			    "current_revenue" -> obj.getAs[Number]("current_revenue").get.longValue.toString
		    )
	    }.groupBy(g => g("hosp_code"))
    
        Map(
           "data" -> toJson(reportMap)
        )
    }
}
