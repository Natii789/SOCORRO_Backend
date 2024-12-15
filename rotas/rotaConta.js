import { Router } from "express";
import ContaCTRL from "../controle/contaCTRL.js";

const rota = Router();
const contaCTRL = new ContaCTRL();

rota.get("/", contaCTRL.consultar)
    .get("/:termo", contaCTRL.consultar)
    .post("/", contaCTRL.gravar)
    .put("/", contaCTRL.alterar)
    .patch("/", contaCTRL.alterar)
    .delete("/", contaCTRL.excluir)
    .post('/verificarSenha', contaCTRL.verificarSenha);

export default rota;