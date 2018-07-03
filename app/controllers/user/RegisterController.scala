package controllers.user

import javax.inject.Inject

import akka.actor.ActorSystem
import com.pharbers.bmmessages.{CommonModules, MessageRoutes}
import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.token.AuthTokenTrait
import play.api.mvc._
import play.api.libs.json.Json._
import controllers.common.requestArgsQuery
import com.pharbers.bmpattern.LogMessage.{common_log, msg_log}
import com.pharbers.bmpattern.ResultMessage.{common_result, msg_CommonResultMessage}
import module.user.RegisterMessage._


class RegisterController @Inject()(as_inject: ActorSystem, dbt: dbInstanceManager, att: AuthTokenTrait) {
	
	implicit val as: ActorSystem = as_inject
	
	def registerUser = Action(request => requestArgsQuery().requestArgsV2(request){ jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("registerUser"))), jv)
			:: MsgCheckRepeatRegisterUser(jv)
			:: MsgRegisterUser(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
	})
	
	def registerUserCheckAccount = Action(request => requestArgsQuery().requestArgsV2(request){ jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("registerUserCheckAccount"))), jv)
			:: MsgCheckRepeatRegisterUserAccount(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
	})
	
	def registerUserCheckEmail = Action(request => requestArgsQuery().requestArgsV2(request){ jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("registerUserCheckEmail"))), jv)
			:: MsgCheckRepeatRegisterUserEmail(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
	})
	
	def registerUserCheckPhone = Action(request => requestArgsQuery().requestArgsV2(request){ jv =>
		MessageRoutes(msg_log(toJson(Map("method" -> toJson("registerUserCheckPhone"))), jv)
			:: MsgCheckRepeatRegisterUserPhone(jv)
			:: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt, "att" -> att))))
	})
}
