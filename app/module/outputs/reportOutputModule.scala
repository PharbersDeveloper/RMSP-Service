package module.outputs

import com.pharbers.ErrorCode
import com.pharbers.bmmessages.{CommonModules, MessageDefines}
import com.pharbers.bmpattern.ModuleTrait
import com.pharbers.dbManagerTrait.dbInstanceManager
import module.outputs.reportOutputData.{reportOutputCondition, reportOutputData}
import module.outputs.reportOutputMessages._
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

object reportOutputModule extends ModuleTrait {
    def dispatchMsg(msg: MessageDefines)
                   (pr: Option[String Map JsValue])
                   (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = msg match {

        case reportFinishedPhaseCount(data) => reportFinishedPhaseCount(data)
        case reportLastFinishedPhase(data) => reportLastFinishedPhase(data)
        case reportDataInOpPhase(data) => reportDataInOpPhase(data)
        case _ => throw new Exception("function is not impl")
    }

    object inner_trait extends reportOutputData with reportOutputCondition

    def reportFinishedPhaseCount(data : JsValue)
                                (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {

        try {

            val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).getOrElse(throw new Exception("no db connection"))
            val db = conn.queryDBInstance("stp").get

            import inner_trait.dc
            import inner_trait.d2m

            val reVal = db.queryObject(data, "report").map { x =>
                x.get("result").get.asOpt[List[JsValue]].get.map { iter =>
                    (iter \ "phase").asOpt[Int].get
                }
            }.getOrElse(Nil).distinct

            (Some(Map("phase_count" -> toJson(reVal.length))), None)

        } catch {
            case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
        }
    }

    def reportLastFinishedPhase(data : JsValue)
                                (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {

        try {

            val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).getOrElse(throw new Exception("no db connection"))
            val db = conn.queryDBInstance("stp").get

            import inner_trait.dc
            import inner_trait.d2m

            db.queryObject(data, "report").map { x =>
                x.get("report").get.asOpt[List[JsValue]].get.map { iter =>
                    (iter \ "phase").asOpt[Int].get
                }
            }.getOrElse(Nil).distinct.sorted match {
                case Nil => (Some(Map("finished_phase" -> toJson(0))), None)
                case lst : List[Int] => (Some(Map("finished_phase" -> toJson(lst.last))), None)
            }

        } catch {
            case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
        }
    }

    def reportDataInOpPhase(data : JsValue)
                           (implicit cm: CommonModules): (Option[String Map JsValue], Option[JsValue]) = {

        try {

            val conn = cm.modules.get.get("db").map(x => x.asInstanceOf[dbInstanceManager]).getOrElse(throw new Exception("no db connection"))
            val db = conn.queryDBInstance("stp").get

            import inner_trait.dc
            import inner_trait.d2m

            db.queryObject(data, "report").map { x =>
                x.get("report").get.asOpt[List[JsValue]].get.filter { iter =>
                    (iter \ "phase").asOpt[Int].get == (data \ "phase").asOpt[Int].get
                }
            }.getOrElse(Nil) match {
                case lst : List[JsValue] => (Some(Map("report" -> toJson(lst))), None)
            }

        } catch {
            case ex: Exception => (None, Some(ErrorCode.errorToJson(ex.getMessage)))
        }
    }
}