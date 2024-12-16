import { Router } from "express";
import TipoContaCTRL from "../controle/tipoContaCTRL.js";

const rota = Router();
const tipoContaCTRL = new TipoContaCTRL();

rota.get("/", tipoContaCTRL.consultar)
rota.get("/:termo", tipoContaCTRL.consultar)
rota.post("/", tipoContaCTRL.gravar)
rota.put("/", tipoContaCTRL.alterar)
rota.patch("/", tipoContaCTRL.alterar)
rota.delete("/", tipoContaCTRL.excluir)
rota.post("/verificar", tipoContaCTRL.verificar);

export default rota;