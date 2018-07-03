package com.pharbers.InjecteModule

import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.driver.PhRedisDriver
import com.pharbers.driver.util.PhRedisTrait
import com.pharbers.token.AuthTokenTrait
import play.api.{Configuration, Environment}
import play.api.inject.{Binding, Module}

class PharbersModule extends Module {
	 def bindings(environment: Environment, configuration: Configuration): Seq[Binding[_]] = {
		Seq(
			bind[PhRedisTrait].to[PharbersInjectRedis],
			bind[dbInstanceManager].to[PharbersInjectDBManager],
			bind[AuthTokenTrait].to[PharbersInjectTokenModule]
		)
	}
}
