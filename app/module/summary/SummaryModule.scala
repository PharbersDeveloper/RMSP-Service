package module.summary

import com.mongodb.casbah.Imports._
import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import com.pharbers.dbManagerTrait.dbInstanceManager
import module.summary.SummaryData.SummaryData
import module.summary.SummaryMessage._
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

object SummaryModule extends ModuleTrait with SummaryData{
	def dispatchMsg(msg: MessageDefines)
	               (pr: Option[String Map JsValue])
	               (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {
		case MsgProductsQuery(data) => productQuery(data)
		case MsgCommentsQuery(data) => commentsQuery(data)(pr)
		case MsgSummaryQuery(data) => summaryQuery(data)(pr)
//		case MsgGenerateSummary(data) => generateSummaryData(data)(pr)
		case _ => throw new Exception("function is not impl")
	}
	
	def productQuery(data: JsValue)
	                (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).
				getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val reVal = db.queryMultipleObject(DBObject(), "products")(products2d)
			(Some(Map("products_data" -> toJson(reVal))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def commentsQuery(data: JsValue)
	                 (pr: Option[String Map JsValue])
	                 (implicit cm: CommonModules) = {
		try {
			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).
			getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val reVal = db.queryMultipleObject(DBObject(), "comments")(comments2d)
			(Some(Map("comments_data" -> toJson(reVal)) ++ pr.get), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def summaryQuery(data: JsValue)
	                (pr: Option[String Map JsValue])
	                (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {

			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).
				getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val o = d2m(data)
			val reVal = db.queryObject(o,"assessment")(s2d(_, data))
			
			val products = pr.get("products_data").as[List[String Map JsValue]]
			val comment_root = pr.get("comments_data").as[List[String Map JsValue]]
			val radar_map = reVal.map (_("assess_results").as[List[String Map JsValue]]).
				getOrElse(throw new Exception("data not exist")).
				map { x =>
					val root = comment_root.find(_("code").as[Int] == x("ability_code").as[Int]).get("details").
						as[List[String Map JsValue]].find(_("code").as[Int] == x("kpi_code").as[Int])
					val comments = root.
						get("comments").
						as[List[String Map JsValue]].find(_("score").as[Int] == x("basic_score").as[Int]).
						getOrElse(throw new Exception("data not exist"))
					val advice = comments("advice").as[List[String Map JsValue]].
						filter(_("describe").as[String] != "")
//						find(_("code").as[Int] == x("second_score").as[Int])
					Map("name" -> root.get("name"),
						"code" -> root.get("code"),
						"advice" -> toJson(advice),
						"comments" -> toJson(comments - "advice")
					)
				}
			val total_sales = reVal.map(_("final_revenue_info").as[String Map JsValue]).map{ x =>
				Map("total" -> x("revenue").as[Double],
					"uplift_ratio" -> x("uplift_ratio").as[Double] * 100
				)
			}
			val team_achievement = reVal.map(_("achievement_info").as[List[String Map JsValue]]).
				getOrElse(throw new Exception("data not exist")).
				map{ x =>
					val p = products.find(_("prod_code").as[String].toInt == x("prod_code").as[Int]).get
					Map("product_name" -> toJson(p("prod_name").as[String]),
						"achievement_ratio" -> toJson(x("achievement_ratio").as[Double] * 100)
					)
			}
			val market_share = reVal.map(_("market_share_info").as[List[String Map JsValue]]).
				getOrElse(throw new Exception("data not exist")).
				map{ x =>
					val p = products.find(_("prod_code").as[String].toInt == x("prod_code").as[Int]).get
					Map("product_name" -> toJson(p("prod_name").as[String]),
						"market_share" -> toJson(x("market_share").as[Double] * 100),
						"uplift_ratio" -> toJson(x("uplift_ratio").as[Double] * 100)
					)
				}
			val team_ability = reVal.map(_("team_ability_info").as[String Map JsValue]).map{ x =>
				Map("team_ability" -> x("team_ability").as[Double],
					"uplift_ratio" -> x("uplift_ratio").as[Double] * 100
				)
			}
			
			val result = Map("radar_map" -> toJson(radar_map),
				"overall_score" -> reVal.get("overall_score"),
				"total_sales" -> toJson(total_sales),
				"team_achievement" -> toJson(team_achievement),
				"market_share" -> toJson(market_share),
				"team_ability" -> toJson(team_ability)
			)
			(Some(Map("data" -> toJson(result))), None)
		} catch {
			case ex: Exception =>
				println(ex.getMessage)
				(None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def generateSummaryData(data: JsValue)
	                       (pr: Option[String Map JsValue])
	                       (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			
			(Some(Map("data" -> toJson(Map("flag" -> toJson(true) )))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
}
