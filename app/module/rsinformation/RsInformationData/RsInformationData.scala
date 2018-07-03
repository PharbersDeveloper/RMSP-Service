package module.rsinformation.RsInformationData

import play.api.libs.json.JsValue
import com.mongodb.casbah.Imports._
import play.api.libs.json.Json.toJson
import java.text.NumberFormat
import java.util.UUID

import com.pharbers.panel.util.excel.phHandleExcel

trait RsInformationData {
	
	def thousandsConvert(str: Option[String]): String =
		str.map(x => if (x.toString.isEmpty) "" else NumberFormat.getInstance().format(x.toDouble)).getOrElse("")
	
	implicit val m2d: JsValue => DBObject = { jv =>
		val builder = MongoDBObject.newBuilder
		(jv \ "condition" \ "uuid").asOpt[String].map(x => builder += "uuid" -> x)
			.getOrElse(throw new Exception("wrong input"))
		(jv \ "condition" \ "phase").asOpt[Int].map(x => builder += "phase" -> x)
			.getOrElse(throw new Exception("wrong input"))
		builder.result
	}
	
	def hospitalConvertMap(o: DBObject): String Map JsValue = {
		Map("hospitalName" -> toJson(o.getAs[String]("hosp_name")),
			"hospitalCode" -> toJson(o.getAs[String]("hosp_code")),
			"hospitalArea" -> toJson(o.getAs[String]("hosp_area")),
			"hospitalCat" -> toJson(o.getAs[String]("hosp_cat"))
		)
	}
	
	def phraseConvertMap(o: DBObject): String Map JsValue = {
		val values = o.getAs[DBObject]("value").get
		Map("hospitalCode" -> toJson(o.getAs[DBObject]("_id").get.getAs[String]("hc")),
			"oralAntibiotics" -> toJson(thousandsConvert(values.getAs[String]("1"))),
			"aHypoglycemicAgent" -> toJson(thousandsConvert(values.getAs[String]("2"))),
			"threeHypoglycemicAgent" -> toJson(thousandsConvert(values.getAs[String]("3"))),
			"skinMedicine" -> toJson(thousandsConvert(values.getAs[String]("4")))
		)
	}
	
	def initialResultConvertMap(o: DBObject, phase: Int): String Map JsValue = {
		val result = o.getAs[MongoDBList]("pre_result").get.toList.asInstanceOf[List[BasicDBObject]].
			find(f => f.getAs[Number]("stage").get.intValue() == phase).get
		
		Map("hospitalCode" ->  toJson(o.getAs[String]("hosp_code")),
			"oralAntibiotics" -> toJson(result.getAs[String]("1")),
			"aHypoglycemicAgent" -> toJson(result.getAs[String]("2")),
			"threeHypoglycemicAgent" -> toJson(result.getAs[String]("3")),
			"skinMedicine" -> toJson(result.getAs[String]("4"))
		)
	}
	
	def previousResultConvertMap(o: DBObject, phase: Int, reportName: String): String Map JsValue = {
		val reVal = o.getAs[MongoDBList]("report").get.toList.asInstanceOf[List[BasicDBObject]].
			find(f => f.getAs[Number]("phase").get.intValue() == phase &&
					f.getAs[String]("report_name").get == reportName).get.getAs[MongoDBList]("result").get.
						toList.asInstanceOf[List[BasicDBObject]]
		
		val result = reVal.groupBy(g => g.getAs[Number]("hosp_code").get.intValue()).map{ x =>
			Map("hospitalCode" -> toJson(x._1.toString),
				"oralAntibiotics" -> toJson(thousandsConvert(Some(x._2.find(f =>
					f.getAs[String]("prod_name").get == "口服抗生素").get.getAs[Number]("last_revenue").get.doubleValue().toString))),
				"aHypoglycemicAgent" -> toJson(thousandsConvert(Some(x._2.find(f =>
					f.getAs[String]("prod_name").get == "一代降糖药").get.getAs[Number]("last_revenue").get.doubleValue().toString))),
				"threeHypoglycemicAgent" -> toJson(thousandsConvert(Some(x._2.find(f =>
					f.getAs[String]("prod_name").get == "三代降糖药").get.getAs[Number]("last_revenue").get.doubleValue().toString))),
				"skinMedicine" -> toJson(thousandsConvert(Some(x._2.find(f =>
					f.getAs[String]("prod_name").get == "皮肤药").get.getAs[Number]("last_revenue").get.doubleValue().toString)))
			)
		}.toList
		Map("result" -> toJson(result))
	}
	
	def generateFile(data: JsValue, phase: Int): String = {
		val productNames = Map("chname" -> "口服抗生素", "enname" -> "oralAntibiotics") ::
						   Map("chname" -> "一代降糖药", "enname" -> "aHypoglycemicAgent") ::
				           Map("chname" -> "三代降糖药", "enname" -> "threeHypoglycemicAgent") ::
					       Map("chname" -> "皮肤药", "enname" -> "skinMedicine") ::
			               Nil
		val file =  UUID.randomUUID().toString + ".xlsx"
		val path = "./files/" + file
		val period = (data \ "period").as[List[String Map String]]
		val phrase = (data \ "phrase").as[List[String Map String]]
		val hospitals = (data \ "hospitals").as[List[String Map String]]
		
		val content = hospitals.map { hosp =>
			productNames.map { pn =>
				Map(
					"周期" -> phase.toString,
					"医院名称" -> hosp("hospitalName").toString,
					"产品名称" -> pn("chname"),
					"潜力" -> phrase.find(f => f("hospitalCode") == hosp("hospitalCode")).get(pn("enname")).toString,
					"上期销售额" -> period.find(f => f("hospitalCode") == hosp("hospitalCode")).get(pn("enname")).toString
				)
			}
		}
		
		val title = Map(
			"周期" -> 0,
			"医院名称" -> 1,
			"产品名称" -> 2,
			"潜力" -> 3,
			"上期销售额" -> 4
		)
//		println(toJson(content.flatten))
		
		phHandleExcel().writeByList(content.flatten, path, cellNumArg = title)
		file
	}
	
	def salesmenResultConvertMap(o: DBObject): String Map JsValue = {
		val abilityValue = o.getAs[DBObject]("ability_value").get
		Map("name" -> toJson(o.getAs[String]("name")),
			"productValue" -> toJson(abilityValue.getAs[Number]("products_value").get.intValue()),
			"experienceValue" -> toJson(abilityValue.getAs[Number]("experience_value").get.intValue()),
			"salesValue" -> toJson(abilityValue.getAs[Number]("sales_value").get.intValue()),
			"workValue" -> toJson(abilityValue.getAs[Number]("work_value").get.intValue())
		)
	}
}