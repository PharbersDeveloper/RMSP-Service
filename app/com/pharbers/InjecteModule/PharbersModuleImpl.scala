package com.pharbers.InjecteModule

import javax.inject.Singleton

import com.pharbers.dbManagerTrait.dbInstanceManager
import com.pharbers.driver.util.redis_conn_cache
import com.pharbers.driver.{PhRedisDriver, PhRedisDriverImpl}
import com.pharbers.token.tokenImpl.TokenImplTrait

@Singleton
class PharbersInjectRedis extends redis_conn_cache with PhRedisDriverImpl

@Singleton
class PharbersInjectDBManager extends dbInstanceManager

@Singleton
class PharbersInjectTokenModule extends TokenImplTrait {
	privateKey
	publicKey
}
