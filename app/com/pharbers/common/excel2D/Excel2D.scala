package com.pharbers.common.excel2D

import com.pharbers.common.{Cell, RowParser, Sheet}
import play.api.libs.json.JsValue
import play.api.libs.json.Json.toJson

/**
  * Created by apple on 12/26/17.
  */
case class CellInfo(row : String, column : String, value : String)

class Excel2D(sheet : Sheet){
    
    def parser = new RowParser2D(sheet)
    
    def read_row[A](row_num:Int, from : Char, to :Char)(parser: (String) => A): Map[String , A] ={
        val start = from.toByte.asInstanceOf[Int]
        val end = to.toByte.asInstanceOf[Int]
        val cols = (start to end).map(x => x.asInstanceOf[Char])
        var maps : Map[String, A]= Map()
        try {
            cols.foreach{col =>
                val k = s"$col"+"_"+s"$row_num"
                val v = parser(s"$col"+s"$row_num")
                maps = maps ++ Map(k -> v)
            }
            maps
        }catch {
            case ex : Exception =>
                println(ex)
                throw new Exception(s"have not enough string value in $row_num")
        }
        
    }
    
}
class RowParser2D(sheet: Sheet) {
    def useString:(String) => String = sheet.string
    def useStringOpt:(String) => Option[String] = sheet.stringOpt
    def useInt:(String) => Int = sheet.int
    def useIntOpt:(String) => Option[Int] = sheet.intOpt
    
}