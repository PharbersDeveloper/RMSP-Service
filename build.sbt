import com.typesafe.sbt.packager.docker._
import play.routes.compiler.InjectedRoutesGenerator
import play.sbt.PlayScala

def common = Seq(
	scalaVersion := "2.11.8",
	version := "3.0.4",
	organization := "com.pharbers"
)

lazy val root = (project in file(".")).
	enablePlugins(PlayScala).
	settings(common: _*).
	settings(
		name := "RMSP-Service",
		fork in run := true,
		javaOptions += "-Xmx2G"
	)

routesGenerator := InjectedRoutesGenerator

resolvers += Resolver.mavenLocal

// Docker
import NativePackagerHelper.directory
mappings in Universal ++= directory("pharbers_config_deploy")
	.map(x => x._1 -> x._2.replace("pharbers_config_deploy", "pharbers_config"))

//dockerCommands ++= Seq(
//	Cmd("FROM", "scratch"),
//	Cmd("ADD", "./files/wkhtmltopdf/wkhtmltox-0.12.5-1.centos7.x86_64.rpm ./files/wkhtmltopdf/")
//	Cmd("RUN", "yum -y install xorg-x11-fonts-75dp"),
//	Cmd("RUN", "yum -y install xorg-x11-fonts-Type1")
//	Cmd("RUN", "[\"rpm\", \"-iv\", \"/bin/wkhtmltox-0.12.5-1.centos7.x86_64.rpm\"]"),
//	ExecCmd("wkhtmltopdf", "--help")
//	ExecCmd("CMD", "echo", "Hello, World from Docker")
//)

libraryDependencies ++= Seq(
	jdbc,
	cache,
	ws,
	"org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % "test",
	"commons-httpclient" % "commons-httpclient" % "3.1",
	"org.mongodb" % "casbah_2.11" % "3.1.1",
	"org.apache.poi" % "poi" % "3.8",
	"org.apache.poi" % "poi-ooxml" % "3.8",
	"xerces" % "xercesImpl" % "2.11.0",
	"log4j" % "log4j" % "1.2.17",
	"com.easemob" % "rest-java-sdk" % "1.0.1",
	"com.pharbers" % "pharbers-modules" % "0.2",
	"com.pharbers" % "pharbers-max-util" % "0.2",
	"com.pharbers" % "pharbers-message" % "0.2",
	"com.pharbers" % "mongodb-connect" % "0.2",
	"com.pharbers" % "pharbers-data-parse" % "0.2",
	"com.pharbers" % "pharbers-sercurity" % "0.2",
	"com.pharbers" % "mongodb-driver" % "0.2",
	"com.pharbers" % "redis-driver" % "0.2",
	"com.pharbers" % "mongodb-manager" % "0.2",
	"com.pharbers" % "pharbers-cli-traits" % "0.2",
	"com.pharbers" % "pharbers-pattern" % "0.2",
	"com.pharbers" % "auth-token" % "0.2",
	"com.pharbers" % "encrypt" % "0.2",
	"com.pharbers" % "http" % "0.2",
	"com.pharbers" % "errorcode" % "0.2",
	"net.debasishg" % "redisclient_2.11" % "3.4",
	"org.apache.commons" % "commons-email" % "1.4",
	
//	"com.itextpdf" % "itextpdf" % "5.5.6",
//	"com.itextpdf.tool" % "xmlworker" % "5.5.6",
//	"com.itextpdf" % "itext-asian" % "5.2.0",
//	"org.xhtmlrenderer" % "core-renderer" % "R8",
	
	"org.specs2" %% "specs2-core" % "3.9.1" % "test"
)







