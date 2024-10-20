import { Router } from "express";
import rotasDoCliente from "./client";

const rotasGerais = Router()

rotasGerais.use('/client',rotasDoCliente)


export default rotasGerais;