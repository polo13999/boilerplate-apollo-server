import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import cookieParser from 'cookie-parser'
import config from './config'
import "reflect-metadata"
import { createConnections, getConnection } from "typeorm"
import { ormconfigErp, } from './ormconfig'
import jwtwork from './jwtwork'
import { genSchema } from './utils/genSchema'
import _ from 'lodash'
import http = require('http');

export const main = async () => {
    await createConnections([ormconfigErp])
    const connectionErp = getConnection("Erp")
    const app = express()

    app.use(bodyParser.json({ limit: '10mb' }))
    app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [config.cookieKey], secure: config.production }))
    app.use(cookieParser())
    const server = new ApolloServer({
        schema: genSchema(),
        context: async ({ req }: { req: express.Request }) => { const { userCode, userId }: any = await jwtwork(req); return { req, connectionErp, userId, userCode }; },
        // tracing: true,
        debug: !process.env.PRODUCTION,
        introspection: !process.env.PRODUCTION,
    })
    await server.start()
    //todo: 抽出到config    
    server.applyMiddleware({ app, cors: { credentials: true, origin: ["http://localhost:3001", "http://localhost:3000",] }, })
    const httpServer = http.createServer(app);
    httpServer.listen({ port: 4005 }, () => { console.log(`🚀 GraphQl Server at 開發環境 is    http://localhost:4005${server.graphqlPath}`); })
}

try { main(); } catch (error) { console.log(' 發生錯誤了 error', error); }

