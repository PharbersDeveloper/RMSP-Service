import java.io.{File, InputStreamReader, LineNumberReader, PrintWriter}

import com.pharbers.common.RConfig
import module.writejson.WriteJsonData.WriteJsonData
import play.api.libs.json.Json._
import org.specs2.mutable.Specification

class TestCallCmdWithR extends Specification with WriteJsonData{
	
	
	
//	"Test Call R" must {
//		"Run Call R With Scala And Paly" in{
//
//		}
//	}

	override def is =
		s2"""
        This is a RMSP specification to check the 'conditionSearch' string

            The 'RMSP ' Test functions should
			    testWithWriteJson result must be "true"!                                               testWithWriteJson()
                testCallR result must be "true"!													   testCallR()
		    	r_config_test must be "resource/stp_handler.R"											r_config_test()
		  """
	
//	def testCallR() = {
//		try {
//			val cmd = "Rscript /Users/apple/Desktop/R/new/stp_handler.R /Users/apple/Desktop/R/new/pre_data_linux.RData /Users/qianpeng/Desktop/json/4b35a0dc-986a-4afc-b1e7-c92b2b386977.json"
//			val process = new ProcessBuilder("/bin/bash", "-c", cmd).start()
//			val input = new LineNumberReader(new InputStreamReader(process.getInputStream()))
//			var line,result: String = ""
//			process.waitFor()
//			do {
//				line = input.readLine()
//				if(line != null) result = line
//			} while (line != null)
//			println(result)
//			true must_== true
//		} catch {
//			case e : Exception =>
//				println(e.getMessage)
//				false must_== false
//		}
//	}
//
//	def testWithWriteJson() = {
//		implicit val func = HandleImpl.j2s
//		val json = toJson(Map("name" -> "钱鹏", "age" -> "22", "gender" -> "Man"))
//		val r = wirteJson(json)
//		r.isEmpty must_== true
//	}
	
	def r_config_test() = {
		val r_config = new RConfig()
		val stp = r_config.rfile()
		println(stp)
		stp
	}
	
}
