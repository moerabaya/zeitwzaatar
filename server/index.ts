import cookieSession from 'cookie-session'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { type GraphQLError } from 'graphql'
import { createProxyMiddleware } from 'http-proxy-middleware'
import './config/dbConnection'
import { ServerError, type ErrorCode } from './controllers/server-error'
import { resolvers, schema } from './graphql/index'

dotenv.config()

export const app = express()

export interface Context {
  req: Request & {
    session: {
      userId: string
      username: string
      destroy: () => void
    }
  }
  res: Response
}

const proxyMiddleware = createProxyMiddleware({
  target: 'http://127.0.0.1:3000',
  changeOrigin: true
})

app.use(cors())
app.use(
  cookieSession({
    name: 'session',
    keys: [
      process.env.SIGN_SESSION_KEY!,
      process.env.VERIFY_SESSION_KEY!
    ]
  })
)

app.use('/graphql', (req, res, _next) => {
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    context: { req, res },
    graphiql: true,
    customFormatErrorFn: (err: GraphQLError) => {
      const error = ServerError.getError(err.message as ErrorCode)
      return error
    }
  })(req, res)
})

app.use('/logout', (req, res, _next) => {
  req.session = null
  let redirectTo = ''
  if (req.query?.redirectTo) { redirectTo = req.query?.redirectTo?.toString() }
  res.redirect('/' + redirectTo)
})

// All other GET requests not handled before will return our React app
app.get('*', proxyMiddleware)

app.listen(3001, () => { console.log('Running server on port localhost:3001/graphql') }
)
