import TipoConta from "../modelo/tipoConta.js";
import conectarBanco, { liberarConexao } from "./conexao.js";

export default class TipoContaDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const sql = `
                CREATE TABLE IF NOT EXISTS tipoConta (
                    id INT NOT NULL AUTO_INCREMENT,
                    descricao VARCHAR(100) NOT NULL,
                    PRIMARY KEY (id)
                )`;
            const conexao = await conectarBanco();
            await conexao.execute(sql);
            liberarConexao(conexao);
            console.log("Tabela tipoConta iniciada com sucesso!");
        } catch (erro) {
            console.log("Erro ao iniciar a tabela tipoConta: " + erro);
        }
    }

    async gravar(tipoConta) {
        if (tipoConta instanceof TipoConta) {
            const sql = "INSERT INTO tipoConta (descricao) VALUES (?)";
            const parametros = [tipoConta.descricao];
            const conexao = await conectarBanco();
            const resultado = await conexao.execute(sql, parametros);
            tipoConta.id = resultado[0].insertId;
            liberarConexao(conexao);
        }
    }

    async alterar(tipoConta) {
        if (tipoConta instanceof TipoConta) {
            const sql = "UPDATE tipoConta SET descricao = ? WHERE id = ?";
            const parametros = [tipoConta.descricao, tipoConta.id];
            const conexao = await conectarBanco();
            await conexao.execute(sql, parametros);
            liberarConexao(conexao);
        }
    }

    async excluir(tipoConta) {
        if (tipoConta instanceof TipoConta) {
            const sql = "DELETE FROM tipoConta WHERE id = ?";
            const conexao = await conectarBanco();
            await conexao.execute(sql, [tipoConta.id]);
            liberarConexao(conexao);
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo || ""))) {
            sql = "SELECT * FROM tipoConta WHERE descricao LIKE ?";
            parametros.push(`%${termo}%`);
        } else {
            sql = "SELECT * FROM tipoConta WHERE id = ?";
            parametros.push(termo);
        }

        const conexao = await conectarBanco();
        const [linhas] = await conexao.execute(sql, parametros);
        liberarConexao(conexao);

        return linhas.map(linha => new TipoConta(linha.id, linha.descricao));
    }

    async verificar(id) {
        const sql = "SELECT id FROM tipoConta WHERE id = ?";
        const conexao = await conectarBanco();
        const [linhas] = await conexao.execute(sql, [id]);
        liberarConexao(conexao);
        return linhas.length > 0;
    }
}
