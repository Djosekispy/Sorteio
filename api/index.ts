import express from 'express'
import { PORT } from '../src/config/variables.env'
import rotasGerais from '../src/routes'

const app = express()
const port = PORT

app.use(express.json())
app.use(rotasGerais)
app.listen(port, async ()=>{
    console.log("Servidor Rodando na por : " + port)
})