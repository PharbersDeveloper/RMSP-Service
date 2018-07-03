package controllers.rsinformation

import javax.inject.Inject

import akka.actor.ActorSystem
import com.pharbers.bmmessages.{CommonModules, MessageRoutes}
import com.pharbers.bmpattern.ResultMessage.{common_result, msg_CommonResultMessage}
import com.pharbers.bmpattern.LogMessage.{common_log, msg_log}
import module.rsinformation.RsInformationMessage._
import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.token.AuthTokenTrait
import controllers.common.requestArgsQuery
import play.api.libs.json.Json.toJson
import play.api.mvc.Action

class RsInformationController @Inject()(as_inject: ActorSystem, dbt: dbInstanceManager, att: AuthTokenTrait) {
	implicit val as: ActorSystem = as_inject
	
	def generateHospitalFile = Action(request => requestArgsQuery().requestArgsV2(request) { jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("generateHospitalFile"))), jv)
			:: MsgGetHospitals(jv) :: MsgGetPhrase(jv) :: MsgGetPreviousResult(jv) :: MsgGenerateHospitalFile(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
	})
	
	def salesmenRadarMap = Action(request => requestArgsQuery().requestArgsV2(request) { jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("salesmenRadarMap"))), jv)
			:: MsgSalesMenRadarMap(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
	})
	
}
