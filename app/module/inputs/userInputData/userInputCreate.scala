package module.inputs.userInputData

import java.util.Date

import com.mongodb.casbah.Imports._
import play.api.libs.json.JsValue

trait userInputCreate {
    implicit val c2d : JsValue => DBObject = { mm =>
        val builder = MongoDBObject.newBuilder

        builder += "user_id" -> (mm \ "user_id").asOpt[String].get
        builder += "uuid" -> (mm \ "uuid").asOpt[String].get

        builder += "decision" -> createDecision
        builder += "management" -> createManagement

        builder += "date" -> new Date().getTime
        builder.result
    }

    val klst = "经理" :: Nil
    val nlst = "小宋" :: "小兰" :: "小木" :: "小白" :: "小青" :: Nil
    val mlst = ("能力辅导", nlst) :: ("实地协访", nlst) :: ("团队例会和团建", klst) ::
               ("KPI 报告分析", klst) :: ("行政工作", klst) :: ("产品培训", nlst) :: Nil

    val hlst = "人民医院" :: "军区医院" :: "中日医院" :: "铁路医院" :: "海港医院" :: "第六医院" ::
                    "小营医院" :: "西河医院" :: "光华医院" :: "大学医院" :: Nil

    val plst = "口服抗生素" :: "一代降糖药" :: "三代降糖药" :: "皮肤药" :: Nil

    def createManagement = {


        val dst = MongoDBList.newBuilder

        mlst.zipWithIndex.map { iter =>
            val mg = iter._1
            val pg = mg._2

            val builder = MongoDBObject.newBuilder
            builder += "project_name" -> mg._1
            builder += "project_code" -> iter._2
            builder += "phase" -> 1 // index

            val app_lst = MongoDBList.newBuilder

            mg._2.map { n =>
                val tmp = MongoDBObject.newBuilder
                tmp += "personal" -> n
                tmp += "days" -> 0

                app_lst += tmp.result
            }

            builder += "apply" -> app_lst.result

            dst += builder.result
        }
//        }

        mlst.zipWithIndex.map { iter =>
            val mg = iter._1
            val pg = mg._2

            val builder = MongoDBObject.newBuilder
            builder += "project_name" -> mg._1
            builder += "project_code" -> iter._2
            builder += "phase" -> 2 // index

            val app_lst = MongoDBList.newBuilder

            mg._2.map { n =>
                val tmp = MongoDBObject.newBuilder
                tmp += "personal" -> n
                tmp += "days" -> 0

                app_lst += tmp.result
            }

            builder += "apply" -> app_lst.result

            dst += builder.result
        }

        dst.result
    }

    def createDecision = {

        //        val dd = (mm \ "decision").asOpt[List[JsValue]].get
        val dst = MongoDBList.newBuilder

        1 to 2 map { index =>
        (1 to 10).map { d =>
            val tmp = MongoDBObject.newBuilder
            tmp += "hosp_code" -> d //(d \ "hosp_id").asOpt[String].get
            tmp += "hosp_name" -> hlst(d - 1)
            tmp += "phase" -> index
            tmp += "budget" -> 0.0
            tmp += "salesmen" -> ""

            //            val ss = (d \ "sales").asOpt[List[JsValue]].get
            val sales_lst = MongoDBList.newBuilder
            (1 to 4) map { s =>
                val tmp_ss = MongoDBObject.newBuilder
                tmp_ss += "prod_name" -> plst(s - 1) // s.toString // (s \ "prod_name").asOpt[String].get
                tmp_ss += "prod_value" -> 0.0 //(s \ "prod_value").asOpt[Double].get

                sales_lst += tmp_ss.result
            }
            tmp += "sales" -> sales_lst.result

            //            val vv = (d \ "visit_hours").asOpt[List[JsValue]].get
            val vh_lst = MongoDBList.newBuilder
            (1 to 4) map { v =>
                val tmp_vv = MongoDBObject.newBuilder
                tmp_vv += "prod_name" -> plst(v - 1) // v.toString // (v \ "prod_name").asOpt[String].get
                tmp_vv += "prod_hours" -> 0.0 //(v \ "prod_hours").asOpt[Double].get

                vh_lst += tmp_vv.result
            }
            tmp += "visit_hours" -> vh_lst.result

            dst += tmp.result
        }}
        dst.result
    }
}
