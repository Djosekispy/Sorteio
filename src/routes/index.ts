import express from "express";
import rotasDoCliente from "./client";

const rotasGerais = express.Router()

rotasGerais.use('/',rotasDoCliente)


export default rotasGerais;