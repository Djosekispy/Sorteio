import express from "express";
import rotasDoCliente from "./client";
import adminRouter from "./admin";

const rotasGerais = express.Router()

rotasGerais.use(rotasDoCliente)
rotasGerais.use('/admin',adminRouter)

export default rotasGerais;