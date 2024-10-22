import express from 'express'
import { PORT } from '../src/config/variables.env'
import rotasGerais from '../src/routes'
import errorHandler from '../src/http/middleware/errorHandle'
import { corsMiddleware } from '../src/http/middleware/cors'

const app = express()
const port = PORT

app.use(corsMiddleware);
app.use(express.json())
app.use(rotasGerais)
app.use(errorHandler);
app.listen(port, async ()=>{
    console.log("Servidor Rodando na por : " + port)
})