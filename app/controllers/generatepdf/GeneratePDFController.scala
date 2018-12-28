package controllers.generatepdf

import javax.inject.Inject
import akka.actor.ActorSystem
import com.pharbers.bmmessages.{CommonModules, MessageRoutes}
import com.pharbers.bmpattern.ResultMessage.{common_result, msg_CommonResultMessage}
import com.pharbers.bmpattern.LogMessage.{common_log, msg_log}
import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.token.AuthTokenTrait
import controllers.common.requestArgsQuery
import module.generatepdf.GeneratePDFMessage.MsgGeneratePDF
import play.api.libs.json.Json.toJson
import play.api.mvc.Action

class GeneratePDFController @Inject()(as_inject: ActorSystem, dbt: dbInstanceManager, att: AuthTokenTrait) {
	implicit val as: ActorSystem = as_inject
	
	def generatePDF() = Action(request => requestArgsQuery().requestArgsV2(request){ jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("generatPDF"))), jv)
			:: MsgGeneratePDF(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
	})
}
