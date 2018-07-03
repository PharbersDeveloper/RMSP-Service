package module.auth.AuthData


import com.mongodb.casbah.Imports.{DBObject, _}
//import com.pharbers.cliTraits.DBTrait
import play.api.libs.json.Json._

import play.api.libs.json.JsValue

trait AuthData {
	
	implicit val d2m: DBObject => String Map JsValue = { obj =>
		val account = obj.getAs[String]("user").getOrElse("")
//		val name = obj.getAs[String]("name").getOrElse("")
//		val corperation = obj.getAs[String]("corperation").getOrElse("")
//		val department = obj.getAs[String]("department").getOrElse("")
		Map("account" -> toJson(account))
	}
	
	implicit val m2d: JsValue => DBObject = { jv =>
		val builder = MongoDBObject.newBuilder
		val account = (jv \ "condition" \ "account").asOpt[String].getOrElse(throw new Exception(""))
		val password = (jv \ "condition" \ "password").asOpt[String].getOrElse(throw new Exception(""))
		builder += "user" -> account
		builder += "pw" -> password
		builder.result
    }
	
}
