package com.pharbers.module

import java.io.{File, FileInputStream}

import com.pharbers.common.RConfig

object fop {
	def downloadFile(name: String) : Array[Byte] = {
		val file = new File(s"${System.getProperty("user.dir")}/files/$name")
		val reVal : Array[Byte] = new Array[Byte](file.length.intValue)
		new FileInputStream(file).read(reVal)
		reVal
	}
}
