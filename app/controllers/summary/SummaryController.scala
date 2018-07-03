package controllers.summary

import javax.inject.Inject

import akka.actor.ActorSystem
import com.pharbers.bmmessages.{CommonModules, MessageRoutes}
import com.pharbers.bmpattern.LogMessage.{common_log, msg_log}
import com.pharbers.bmpattern.ResultMessage.{common_result, msg_CommonResultMessage}
import com.pharbers.dbManagerTrait.dbInstanceManager
import controllers.common.requestArgsQuery
import module.summary.SummaryMessage._
import play.api.libs.json.Json.toJson
import play.api.mvc.Action

class SummaryController @Inject()(implicit as_inject: ActorSystem, dbt: dbInstanceManager) {
	def query = Action(request => requestArgsQuery().requestArgsV2(request){ jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("summary"))), jv)
			:: MsgProductsQuery(jv) :: MsgCommentsQuery(jv) :: MsgSummaryQuery(jv) //MsgGenerateSummary(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt))))
	})
}
