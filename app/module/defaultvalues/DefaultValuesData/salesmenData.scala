package module.defaultvalues.DefaultValuesData

import com.mongodb.casbah.Imports._
import org.bson.types.ObjectId
import play.api.libs.json.{JsValue, Json}
import play.api.libs.json.Json.toJson

trait salesmenData {
    implicit val salesmen_d2m : DBObject => Map[String, JsValue] = { obj =>
        Map(
            "_id" -> toJson(obj.getAs[ObjectId]("_id").get.toString),
            "name" -> toJson(obj.getAs[String]("name").get),
    
            "age" -> toJson(obj.getAs[Number]("age").get.intValue()),
            "education" -> toJson(obj.getAs[String]("education").get),
            "professional" -> toJson(obj.getAs[String]("professional").get),
            "seniority" -> toJson(obj.getAs[String]("seniority").get),
            "entry_time" -> toJson(obj.getAs[String]("entry_time").get),
            "professional_exper" -> toJson(obj.getAs[String]("professional_exper").get),
            "sales_skills" -> toJson(obj.getAs[String]("sales_skills").get),
            "recent_situation" -> toJson(obj.getAs[String]("recent_situation").get),
            
            "description" -> toJson(obj.getAs[String]("description").get),
            "skills" -> toJson(obj.getAs[String]("skills").get),
            "motivation" -> toJson(obj.getAs[String]("motivation").get),
            "date" -> toJson(obj.getAs[Number]("date").get.longValue)
        )
    }
    
    val default_report: DBObject => String Map JsValue = { obj =>
        val report = obj.getAs[MongoDBList]("report").get.toList.asInstanceOf[List[DBObject]]
        val team_score = report.find(x => x.getAs[String]("report_name").get == "市场销售报告_商业价值").get.
            getAs[MongoDBList]("result").get.toList.asInstanceOf[List[DBObject]].
            find(x => x.getAs[String]("general_names").get == "团队能力(指数)").get.getAs[Number]("phase1").get.intValue()
	    val salesmen_skills= report.find(x => x.getAs[String]("report_name").get == "代表报告_销售技巧").get.
            getAs[MongoDBList]("result").get.toString
        
        val salesmen_knowledge = report.find(x => x.getAs[String]("report_name").get == "代表报告_产品知识").get.
            getAs[MongoDBList]("result").get.toString
    
        val salesmen_positive = report.find(x => x.getAs[String]("report_name").get == "代表报告_工作积极性").get.
            getAs[MongoDBList]("result").get.toString
        
        Map(
            "team_score" -> toJson(team_score),
            "salesmen_skills" -> Json.parse(salesmen_skills),
            "salesmen_knowledge" -> Json.parse(salesmen_knowledge),
            "salesmen_positive" -> Json.parse(salesmen_positive)
        )
    }

    val team_info: DBObject => String Map JsValue = { obj =>
        Map(
            "creation_time" -> toJson(obj.getAs[String]("creation_time")),
            "people_number" -> toJson(obj.getAs[String]("people_number")),
            "experience" -> toJson(obj.getAs[String]("experience")),
            "former_prod" -> toJson(obj.getAs[String]("former_prod")),
            "area_familiarity" -> toJson(obj.getAs[String]("area_familiarity")),
            "area_survey" -> toJson(obj.getAs[String]("area_survey"))
        )
    }
}
