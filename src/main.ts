import RoutesConfig from '@/infra/http/RoutesConfig'
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory'
// import ExpressHttp from '@/infra/http/ExpressHttp'
import FastifyHttp from '@/infra/http/FastifyHttp'
import { env } from '@/infra/env/environment'

// const http = new ExpressHttp()
const http = new FastifyHttp()
const repositoryFactory = new DatabaseRepositoryFactory()
const routesConfig = new RoutesConfig(http, repositoryFactory)
routesConfig.build()
http.listen(env.PORT)
