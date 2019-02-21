package com.pharbers.common.cmd.wkhtmltopdf

import com.pharbers.aqll.common.alCmd._

case class CallPDF(host: String, uuid: String, path: String) extends alShellPythonCmdExce  {
	override def cmd: String = s"wkhtmltopdf --javascript-delay 3000 --window-status 'ojbk' --debug-javascript http://$host/summary/$uuid $path"
}
