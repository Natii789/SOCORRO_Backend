import { Router } from "express";
import ContaCTRL from "../controle/contaCTRL.js";

const rota = Router();
const contaCTRL = new ContaCTRL();

rota.get("/", contaCTRL.consultar)
rota.get("/:termo", contaCTRL.consultar)
rota.post("/", contaCTRL.gravar)
rota.put("/", contaCTRL.alterar)
rota.patch("/", contaCTRL.alterar)
rota.delete("/", contaCTRL.excluir)
rota.post('/verificarSenha', contaCTRL.verificarSenha);

export default rota;