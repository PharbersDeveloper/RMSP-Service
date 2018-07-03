package module.rsinformation

import com.mongodb.casbah.Imports._
import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import com.pharbers.common.MergeStepResult
import com.pharbers.dbManagerTrait.dbInstanceManager
import module.rsinformation.RsInformationData.RsInformationData
import module.rsinformation.RsInformationMessage._
import play.api.libs.json.{JsObject, JsValue}
import play.api.libs.json.Json.toJson

object RsInformationModel extends ModuleTrait with RsInformationData {
	def dispatchMsg(msg: MessageDefines)
	               (pr: Option[String Map JsValue])
	               (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {
		case MsgGetHospitals(data)	=> getHospitals(data)
		case MsgGetPhrase(data) => getPhrase(data)(pr)
		case MsgGetPreviousResult(data) => getPreviousResult(data)(pr)
		case MsgGenerateHospitalFile(data) => generateHospitalFile(data)(pr)
		case MsgSalesMenRadarMap(data) => salesmenRadarMap(data)
	}
	
	def getHospitals(data: JsValue)(implicit  cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).
				getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val resVal = db.queryMultipleObject(DBObject(), "hospitals")(hospitalConvertMap)
			val result = Map("hospitals" -> resVal)
			(Some(Map("data" -> toJson(result))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def getPhrase(data: JsValue)
	             (pr: Option[String Map JsValue])
	             (implicit  cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).
				getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val phase = (data \ "condition" \ "phase").asOpt[Int].getOrElse(throw new Exception("wrong input"))
			val resVal = db.queryMultipleObject(DBObject(), "phrase" + phase)(phraseConvertMap)
			
			val result = MergeStepResult(toJson(Map("phrase" -> resVal)), Some(pr.get("data").as[JsObject].value.toMap) )
			(Some(Map("data" -> result)), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def getPreviousResult(data: JsValue)
	                     (pr: Option[String Map JsValue])
	                     (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val phrase = (data \ "condition" \ "phase").as[Int]
			val uuid = (data \ "condition" \ "uuid").as[String]
			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).
				getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val reVal =
				if (phrase == 1) {
					db.queryMultipleObject(DBObject(), "preresult")(initialResultConvertMap(_, phrase))
				} else {
					(db.queryMultipleObject(DBObject("uuid" -> uuid), "report")
						(previousResultConvertMap(_, phrase - 1, "销售报告_销售额每客户"))).head("result").as[List[String Map JsValue]]
				}
			val result = MergeStepResult(toJson(Map("period" -> reVal)), Some(pr.get("data").as[JsObject].value.toMap) )
			(Some(Map("data" -> result)), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def generateHospitalFile(data: JsValue)
	                        (pr: Option[String Map JsValue])
	                        (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val resVal = generateFile(pr.get("data"), (data \ "condition" \ "phase").as[Int])
			(Some(Map("data" -> toJson(resVal))), None)
		} catch {
			case ex: Exception =>
				println(ex.getMessage)
				(None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
	
	def salesmenRadarMap(data: JsValue)(implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {
		try {
			val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).
				getOrElse(throw new Exception("no db connection"))
			val db = conn.queryDBInstance("stp").get
			val resVal = db.queryMultipleObject(DBObject(), "presalesmen")(salesmenResultConvertMap)
			(Some(Map("data" -> toJson(resVal))), None)
		} catch {
			case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
		}
	}
}
