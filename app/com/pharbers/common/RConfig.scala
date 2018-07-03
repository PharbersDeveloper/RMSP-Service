package com.pharbers.common

import java.io.File

import scala.xml.XML

/**
  * Created by yym on 1/3/18.
  */
case class RConfig() {
    val configDir : String = System.getProperty("user.dir")
    val  config_path =s"$configDir/pharbers_config/r_config.xml"
    lazy val xml_file = XML.loadFile(config_path)
    def program_path() : String = {
        val path = (xml_file \ "program-path" \ "program" \ "@value").text
        path
    }
    def rfile() : String = {
        val path = (xml_file \ "r-path" \ "rfile" \ "@value").text
        path
    }
    
    def report_path : String = {
        val path = (xml_file \ "excel-path" \ "report" \"@value").text
        path
    }
}
