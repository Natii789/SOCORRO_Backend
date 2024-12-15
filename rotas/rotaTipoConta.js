import { Router } from "express";
import TipoContaCTRL from "../controle/tipoContaCTRL.js";

const rota = Router();
const tipoContaCTRL = new TipoContaCTRL();

rota.get("/", tipoContaCTRL.consultar)
    .get("/:termo", tipoContaCTRL.consultar)
    .post("/", tipoContaCTRL.gravar)
    .put("/", tipoContaCTRL.alterar)
    .patch("/", tipoContaCTRL.alterar)
    .delete("/", tipoContaCTRL.excluir)
    .post("/verificar", tipoContaCTRL.verificar);

export default rota;