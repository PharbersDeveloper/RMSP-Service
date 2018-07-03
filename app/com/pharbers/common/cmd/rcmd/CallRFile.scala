package com.pharbers.common.cmd.rcmd

import com.pharbers.aqll.common.alCmd._

case class CallRFile(rfile : String, rDataPath: String, fileKey: String, reportPath: String) extends alShellOtherCmdExce{
	override def cmd: String = s"Rscript $rfile $rDataPath $fileKey $reportPath"
}

case class CallRFile2(rfile: String, uuid: String, phase: Int) extends alShellPythonCmdExce {
	override def cmd: String = s"Rscript $rfile $uuid $phase"
}
