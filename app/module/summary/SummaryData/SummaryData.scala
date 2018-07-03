package module.summary.SummaryData

import play.api.libs.json.{JsObject, JsValue}
import com.mongodb.casbah.Imports._
import play.api.libs.json.Json.toJson
import play.libs.Json

trait SummaryData {
	implicit val d2m: JsValue => DBObject = { jv =>
		val builder = MongoDBObject.newBuilder
		(jv \ "condition" \ "uuid").asOpt[String].map(x => builder += "uuid" -> x)
		builder.result
	}
	
	val products2d: DBObject => String Map JsValue = { db =>
		Map("prod_code" -> toJson(db.getAs[String]("prod_code")),
			"prod_brand" -> toJson(db.getAs[String]("prod_brand")),
			"prod_name" -> toJson(db.getAs[String]("prod_name"))
		)
	}

	val comments2d: DBObject => String Map JsValue = { db =>
		toJson(Json.parse(db.toString)).as[JsObject].value.toMap - "_id"
	}
	
	val s2d: (DBObject, JsValue) => String Map JsValue = (db, jv) => {
		val phase_key = (jv \ "condition" \ "phase_key").as[String]
		val result = db.getAs[DBObject]("result").map(_.getAs[DBObject](phase_key).get).get
		toJson(Json.parse(result.toString)).as[JsObject].value.toMap
	}
}
