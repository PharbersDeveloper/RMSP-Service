package controllers.checkstatus

import javax.inject.Inject

import akka.actor.ActorSystem
import com.pharbers.bmmessages.{CommonModules, MessageRoutes}
import com.pharbers.bmpattern.ResultMessage.{common_result, msg_CommonResultMessage}
import com.pharbers.bmpattern.LogMessage.{common_log, msg_log}
import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.token.AuthTokenTrait
import controllers.common.requestArgsQuery
import module.checkstatus.CheckStatusMessage.MsgCheckStatus
import module.outputs.reportOutputMessages.reportLastFinishedPhase
import play.api.libs.json.Json.toJson
import play.api.mvc.Action

class CheckStatusController @Inject()(as_inject: ActorSystem, dbt: dbInstanceManager, att: AuthTokenTrait) {
	implicit val as: ActorSystem = as_inject
	
	def checkStatus = Action(request => requestArgsQuery().requestArgsV2(request){ jv =>
		
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("checkStatus"))), jv)
			:: reportLastFinishedPhase(jv)
			:: MsgCheckStatus(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att, "as_inject" -> as_inject))))
	})

}
