package com.pharbers.common

import scala.xml.XML

/**
  * Created by yym on 1/3/18.
  */
case class PDFConfig() {
    val configDir : String = System.getProperty("user.dir")
    val  config_path =s"$configDir/pharbers_config/pdf_config.xml"
    lazy val xml_file = XML.loadFile(config_path)
    
    def pdf_path : String = {
        val path = (xml_file \ "pdf-path" \ "pdffile" \"@value").text
        path
    }
}
