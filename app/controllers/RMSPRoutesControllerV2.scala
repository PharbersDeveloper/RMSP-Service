 package controllers

import java.util.UUID
import javax.inject.Inject

import com.pharbers.cliTraits.DBTrait
import akka.actor.ActorSystem
import com.pharbers.bmmessages.{CommonModules, MessageRoutes}
import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.token.AuthTokenTrait
import controllers.common.requestArgsQuery
import com.pharbers.bmpattern.LogMessage.{common_log, msg_log}
import com.pharbers.bmpattern.ResultMessage.{common_result, msg_CommonResultMessage}
import module.inputs.userInputMessages._
import module.defaultvalues.DefaultValuesMessages._
import module.outputs.reportOutputMessages.{reportDataInOpPhase, reportLastFinishedPhase}
import play.api.libs.json.JsValue
import play.api.mvc.Action
import play.api.libs.json.Json.toJson
import play.api.mvc._


//TODO： 新版本要重构
class RMSPRoutesControllerV2 @Inject()(as_inject: ActorSystem, dbt: dbInstanceManager, att: AuthTokenTrait) extends Controller with RoutesFilter {

	implicit val as: ActorSystem = as_inject
	implicit val db_basic : DBTrait = dbt.queryDBInstance("stp").get
	implicit val attoken: AuthTokenTrait = att

//	def indexV2 = Action {
//		Ok(views.html.version_2.model.home.template())
//	}

//	def login = Action {
//		Ok(views.html.Login.login())
//	}
	def login = Action {
		Ok(views.html.version_2.model.login.template())
	}

	def start = Action {
		Ok(views.html.version_2.model.start.template())
	}
	def summary = Action {
		Ok(views.html.version_2.model.summary.template())
	}
	
	def transition(uuid: String, phrase: String) = Action {
		Ok(views.html.version_2.model.transition.template(uuid, phrase))
	}
	def indexV2(uuid : String) = Action { request =>
		getUserCookie(request) {
			val user = request.cookies.get("user").get.value

			val jv = toJson(Map("condition" -> toJson(Map("user_id" -> user))))
			val reVal = {
				requestArgsQuery().commonExcution(
					MessageRoutes(msg_log(toJson(Map("method" -> toJson("query user last op"))), jv)
						:: userHasLastOp(jv)
						:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
				)
			}

			if ((reVal \ "status").asOpt[String].get == "ok") {
				val hasOp = (reVal \ "result" \ "hasLastOp").asOpt[Int].get
				val uuid = (reVal \ "result" \ "uuid").asOpt[String].get
				if (hasOp == 1) Ok(views.html.uuid_index(uuid))
				else {
					val uid = UUID.randomUUID().toString
					val jv = toJson(Map("user_id" -> user, "uuid" -> uid))
					val reVal = {
						requestArgsQuery().commonExcution(
							MessageRoutes(msg_log(toJson(Map("method" -> toJson("force create op"))), jv)
								:: forceCreateDefaultInputInOpPhase(jv)
								:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
						)
					}

					if ((reVal \ "status").asOpt[String].get == "ok") Redirect("/home/" + uid + "/1")
					else Redirect("/login")
				}
			} else Redirect("/login")
		}
	}

	def home(uuid: String, phrase: String) = Action { request =>
		val p = (if (phrase == "") "1"
		else phrase)
		val pi = p.toInt

		val flag = checkInputPhase(uuid, pi)
		if (!flag._1) Redirect("/phase_error/" + uuid + "/" + phrase)
		else {
			getUserCookie(request) {
				val market = markets(uuid, phrase) // 包含医院新闻，医院潜力 列表形式
				val product = products(uuid) // 产品列表
				val salesman = brd(uuid) // 代表们的详细介绍
				val decision = decisions(uuid, phrase) //总预算，各个医院基本信息与潜力，代表、上次输入
				val management = managements(uuid, phrase)// 人员培训 上次输入
				val report = getReport(uuid, "1") // 获取report

				Ok(views.html.version_2.model.home.template(uuid, phrase, market("news"),
					product("product"), salesman("salesman"), decision("budget"),
					decision("hospital").as[List[JsValue]], decision("decisioInputs").as[List[JsValue]], management("manageInput").as[List[JsValue]], flag, report))
			}
		}
	}

	def markets(uuid: String, phrase: String): String Map JsValue = {
		val p = if (phrase == "") "1"
		else phrase
		val pi = p.toInt

		val jv = toJson(Map("phrases" -> toJson(1 :: 2 :: Nil)))
		val jv1 = toJson(Map("phrases" -> toJson(pi :: Nil),
			"condition" -> toJson(Map(
				"uuid" -> toJson(uuid)
			))
		))
		val reVal1 = {
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("alOutExcelVcalueWithHtml"))), jv)
					:: hospitalPotentialInProposal(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)
		}

		val reVal2 = {
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("alOutExcelVcalueWithHtml"))), jv1)
					:: perResultInProposal(jv1)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)
		}
		Map("news" -> (reVal2 \ "result" \ "preresult").asOpt[JsValue].get,
			"potential" -> (reVal1 \ "result" \ "hospital_potential").asOpt[JsValue].get)

//		if ((reVal1 \ "status").asOpt[String].get == "ok" &&
//			(reVal2 \ "status").asOpt[String].get == "ok") {
//			Ok(views.html.Module.MarketInfo.market_index(
//				(reVal2 \ "result" \ "preresult").asOpt[JsValue].get,
//				(reVal1 \ "result" \ "hospital_potential").asOpt[JsValue].get
//			)(uuid)(p)(checkPhase(uuid, pi)))
//		} else Redirect("/login")
//
//		null
	}

	def products(uuid : String): String Map List[JsValue] = {
		val jv = toJson("")
		val reVal =
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("products proposal"))), jv)
					:: productInProposal(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)

		Map("product" -> (reVal \ "result" \ "products").asOpt[List[JsValue]].get)
	}

	def brd(uuid : String): String Map List[JsValue]  = {
		val jv = toJson("")
		val reVal = requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("sales man proposal"))), jv)
					:: salesMenInProposal(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)
		Map("salesman" -> (reVal \ "result" \ "salesmen").asOpt[List[JsValue]].get)
	}

	def decisions(uuid : String, phrase : String): String Map JsValue = {
		val p = (if (phrase == "") "1"
		else phrase)
		val pi = p.toInt

		val jv1 = toJson(Map("phrases" -> toJson(pi :: Nil),
			"condition" -> toJson(Map(
				"uuid" -> toJson(uuid)
			))
		))

		val reVal1 = {
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("alOutExcelVcalueWithHtml"))), jv1)
					:: budgetInProposal(jv1)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)
		}

		val reVal2 = {
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("alOutExcelVcalueWithHtml"))), jv1)
					:: hospitalPotentialInProposal(jv1)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)
		}

		val reVal3 = {
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("alOutExcelVcalueWithHtml"))), jv1)
					:: perResultInProposal(jv1)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)
		}

		val jv = toJson("")
		val reVal =
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("sales man proposal"))), jv)
					:: salesMenInProposal(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)

		val jv2 =
			toJson(Map(
				"phase" -> toJson(pi),
				"condition" -> toJson(Map(
					"uuid" -> toJson(uuid)
				))
			))
		val reVal4 =
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("pre input"))), jv2)
					:: queryUserInputInOpPhase(jv2)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)

		if ((reVal \ "status").asOpt[String].get == "ok" &&
			(reVal1 \ "status").asOpt[String].get == "ok" &&
			(reVal2 \ "status").asOpt[String].get == "ok" &&
			(reVal3 \ "status").asOpt[String].get == "ok" &&
			(reVal4 \ "status").asOpt[String].get == "ok") {

			val budget = (reVal1 \ "result" \ "budget").asOpt[JsValue].get
			val preresult = (reVal3 \ "result" \ "preresult").asOpt[JsValue].get
			val hosp_potential = (reVal2 \ "result" \ "hospital_potential").asOpt[JsValue].get
			val sales_men = (reVal \ "result" \ "salesmen").asOpt[List[JsValue]].get
			val inputs = (reVal4 \ "result" \ "input" \ "decision").asOpt[List[JsValue]].get

			val tmp1 = (preresult \ p).asOpt[List[JsValue]].map (y => y.sortBy(s => (s \ "hosp_code").asOpt[String].map (x => x.toInt).getOrElse(0))).getOrElse(Nil)
			val tmp2 = (hosp_potential \ p).asOpt[List[JsValue]].map (y => y.sortBy(s => (s \ "hosp_code").asOpt[String].map (x => x.toInt).getOrElse(0))).getOrElse(Nil)

			val tmp =
				tmp1 zip tmp2 map { x =>
					toJson(Map(
						"hosp_code" -> toJson((x._1 \ "hosp_code").asOpt[String].get),
						"hosp_name" -> toJson((x._1 \ "hosp_name").asOpt[String].get),
						"hosp_cat" -> toJson((x._1 \ "hosp_cat").asOpt[String].get),
						"口服抗生素" -> toJson((x._1 \ "口服抗生素").asOpt[String].get :: ((x._2) \ "口服抗生素").asOpt[String].get :: Nil),
						"一代降糖药" -> toJson((x._1 \ "一代降糖药").asOpt[String].get :: ((x._2) \ "一代降糖药").asOpt[String].get :: Nil),
						"三代降糖药" -> toJson((x._1 \ "三代降糖药").asOpt[String].get :: ((x._2) \ "三代降糖药").asOpt[String].get :: Nil),
						"皮肤药" -> toJson((x._1 \ "皮肤药").asOpt[String].get :: ((x._2) \ "皮肤药").asOpt[String].get :: Nil)
					))
				}



			Map("budget" -> budget,
				"hospital" -> toJson(tmp),
				"salesmen" -> toJson(sales_men),
				"decisioInputs" -> toJson(inputs))
		} else Map("error" -> toJson("/login"))
	}

	def managements(uuid : String, phrase : String): String Map JsValue = {
		val p = (if (phrase == "") "1"
		else phrase)
		val pi = p.toInt

		val jv =
			toJson(Map(
				"phase" -> toJson(pi),
				"condition" -> toJson(Map(
					"uuid" -> toJson(uuid)
				))
			))
		val reVal =
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("pre input"))), jv)
					:: queryUserManagementInOpPhase(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)

		Map("manageInput" -> toJson((reVal \ "result" \ "input" \ "management").asOpt[List[JsValue]].get))
	}
	
	def getReport(uuid: String, phrase: String): Option[JsValue] = {
		val p = if (phrase == "") "1" else phrase
		val pi = p.toInt
		
		val jv = toJson(Map(
			"phase" -> toJson(pi),
			"condition" -> toJson(Map(
				"uuid" -> toJson(uuid)
			))
		))
		/**
		  * 2.read finish report count
		  */
		val reVal =
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("query finished phase"))), jv)
					:: reportDataInOpPhase(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)
		
		if ((reVal \ "status").asOpt[String].get == "ok") (reVal \ "result").asOpt[JsValue] else None
	}

	def report(uuid : String, phrase : String) = Action { request =>
		val p = if (phrase == "") "1" else phrase
		val pi = p.toInt

		getUserCookie(request) {
			val result = getReport(uuid, phrase)
			if(result.isEmpty) Redirect("/login") else {
				
				Ok(views.html.version_2.model.report.template(uuid, p, result.get))
			}
//			val flag = checkPhase(uuid, pi)
//			if (!flag._1) Redirect("/phase_error/" + uuid + "/" + phrase)
//			else {
//				val result = getReport(uuid, phrase)
//				if(result.isEmpty) Redirect("/login") else {
//
//					Ok(views.html.version_2.model.report.template(uuid, p, result.get))
//				}
//			}
		}
	}

	def takenew = Action { request =>
		getUserCookie(request) {
			val user = request.cookies.get("user").get.value

			val uid = UUID.randomUUID().toString
			val jv = toJson(Map("user_id" -> user, "uuid" -> uid))
			val reVal = {
				requestArgsQuery().commonExcution(
					MessageRoutes(msg_log(toJson(Map("method" -> toJson("force create op"))), jv)
						:: forceCreateDefaultInputInOpPhase(jv)
						:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
				)
			}

			if ((reVal \ "status").asOpt[String].get == "ok") Redirect("/home/" + uid + "/1")
			else Redirect("/login")
		}
	}

	def takelast(uuid : String) = Action { request =>
		getUserCookie(request) {
			val pharse = if(checkInputPhase(uuid, 1)._2 > 2) 2 else checkInputPhase(uuid, 1)._2
			Redirect("/home/" + uuid + "/" + pharse)
		}
	}

	def checkPhase(uuid : String, p : Int) : (Boolean, Int) = {
		val jv = toJson(Map(
			"condition" -> toJson(Map(
				"uuid" -> toJson(uuid)
			))
		))
		val reVal1 =
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("query finished phase"))), jv)
					:: reportLastFinishedPhase(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)

		if ((reVal1 \ "status").asOpt[String].get == "ok") ((reVal1 \ "result" \ "finished_phase").asOpt[Int].get >= p, (reVal1 \ "result" \ "finished_phase").asOpt[Int].get)
		else (false, (reVal1 \ "result" \ "finished_phase").asOpt[Int].get)
	}

	def checkInputPhase(uuid : String, p : Int) : (Boolean, Int) = {
		val jv = toJson(Map(
			"condition" -> toJson(Map(
				"uuid" -> toJson(uuid)
			))
		))
		val reVal1 =
			requestArgsQuery().commonExcution(
				MessageRoutes(msg_log(toJson(Map("method" -> toJson("query finished phase"))), jv)
					:: reportLastFinishedPhase(jv)
					:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
			)

		if ((reVal1 \ "status").asOpt[String].get == "ok") ((reVal1 \ "result" \ "finished_phase").asOpt[Int].get + 1 >= p, (reVal1 \ "result" \ "finished_phase").asOpt[Int].get + 1)
		else (false, (reVal1 \ "result" \ "finished_phase").asOpt[Int].get + 1)
	}


}
