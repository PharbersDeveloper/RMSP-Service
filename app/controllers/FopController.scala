package controllers

import javax.inject.Inject

import akka.actor.ActorSystem
import com.pharbers.module.fop
import play.api.mvc._

class FopController @Inject()(as_inject: ActorSystem) extends Controller {
	
	def downloadFile(name: String) = Action {
		Ok(fop.downloadFile(name)).as("excel/csv")
	}
}
