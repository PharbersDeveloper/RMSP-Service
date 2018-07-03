package module.writejson.WriteJsonData

import com.mongodb.DBObject
import com.mongodb.casbah.commons.MongoDBObject
import play.api.libs.json.JsValue

/**
  * Created by yym on 12/13/17.
  */
trait JMap {
    implicit val m2d : JsValue => DBObject = {jv =>
        val builder = MongoDBObject.newBuilder
        builder += "fileKey" -> (jv \ "fileKey").asOpt[String].getOrElse(throw new Exception("wrong input fileKey"))
        builder += "value"-> (jv \ "value").asOpt[JsValue].getOrElse(throw new Exception("wrong input value")).toString()
        builder.result
    }
    val m2d2 : JsValue => DBObject = {jv =>
        val builder = MongoDBObject.newBuilder
        builder += "fileKey" -> (jv \ "fileKey").asOpt[String].getOrElse(throw new Exception("wrong input fileKey"))
        val pbuilder = MongoDBObject.newBuilder
        val value =  (jv \ "value").asOpt[JsValue].getOrElse(throw new Exception("wrong input value")).toString()
        
        builder.result
    }
    
}
