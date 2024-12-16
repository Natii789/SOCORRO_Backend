import Conta from "../modelo/conta.js";
import conectarBanco, { liberarConexao } from "./conexao.js";

import bcrypt from 'bcrypt';

export default class ContaDAO {
    
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectarBanco();
            const sql = `
                CREATE TABLE IF NOT EXISTS conta (
                    id INT NOT NULL AUTO_INCREMENT, 
                    email VARCHAR(50) NOT NULL, 
                    nome VARCHAR(100) NOT NULL,
                    nascimento DATE NOT NULL, 
                    tipoContaId INT NOT NULL, 
                    senha VARCHAR(255) NOT NULL,
                    PRIMARY KEY (id)
                )`;
            
            await conexao.execute(sql);
            liberarConexao(conexao);
            console.log("Tabela conta iniciada com sucesso!");
        } catch (erro) {
            console.log("Não foi possível iniciar a tabela conta: " + erro);
        }
    }

    async incluir(conta) {
        const conexao = await conectarBanco();
        if (conta instanceof Conta) {
            const sql = `
                INSERT INTO conta (email, nome, nascimento, tipoContaId, senha) 
                VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?)`;
            const hashedPassword = await bcrypt.hash(conta.senha, 10);
            const data = new Date(conta.nascimento);
            const parametros = [
                conta.email, 
                conta.nome, 
                data.toLocaleDateString("pt-BR"),
                conta.tipoContaId, 
                hashedPassword
            ];
            
            const [resultado] = await conexao.execute(sql, parametros);
            conta.id = resultado[0].insertId;
            liberarConexao(conexao);
        }
    }

    async alterar(conta) {
        if (conta instanceof Conta) {
            const sql = `
                UPDATE conta 
                SET email = ?, nome = ?, nascimento = STR_TO_DATE(?, '%d/%m/%Y'), tipoContaId = ?, senha = ? 
                WHERE id = ?`;
            const hashedPassword = await bcrypt.hash(conta.senha, 10);
            const data = new Date(conta.nascimento);
            const parametros = [
                conta.email, 
                conta.nome, 
                data.toLocaleDateString("pt-BR"),
                conta.tipoContaId, 
                hashedPassword, 
                conta.id
            ];
            const conexao = await conectarBanco();
            await conexao.execute(sql, parametros);
            liberarConexao(conexao);
        }
    }

    async excluir(conta) {
        if (conta instanceof Conta) {
            const sql = "DELETE FROM conta WHERE id = ?";
            const conexao = await conectarBanco();
            await conexao.execute(sql, [conta.id]);
            liberarConexao(conexao);
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo || ""))) {
            sql = `
                SELECT c.id, c.email, c.nome, c.nascimento, c.tipoContaId, c.senha,
                    t.id as id_tipoConta, t.descricao as tipoConta
                FROM conta c
                LEFT JOIN tipoConta t ON c.tipoContaId = t.id
                WHERE c.email LIKE ?
                ORDER BY c.nascimento ASC`;
            parametros.push(`%${termo}%`);
        } else {
            sql = `
                SELECT c.id, c.email, c.nome, c.nascimento, c.tipoContaId, c.senha,
                    t.id as id_tipoConta, t.descricao as tipoConta
                FROM conta c
                LEFT JOIN tipoConta t ON c.tipoContaId = t.id
                WHERE c.id = ?
                ORDER BY c.nascimento ASC`;
            parametros.push(termo);
        }

        const conexao = await conectarBanco();
        const [linhas] = await conexao.execute(sql, parametros);
        liberarConexao(conexao);

        return linhas.map(linha => new Conta(
            linha.id,
            linha.email,
            linha.nome,
            linha.nascimento,
            linha.tipoContaId,
            linha.senha
        ));
    }

    async verificarSenha(email, senha) {
        const sql = "SELECT senha FROM conta WHERE email = ?";
        const conexao = await conectarBanco();
        const [linhas] = await conexao.execute(sql, [email]);
        liberarConexao(conexao);
        if (linhas.length === 0) return false;
        return await bcrypt.compare(senha, linhas[0].senha);
    }
}






/*import Conta from "../modelo/conta.js";
import conectarBanco, { liberarConexao } from "../persistencia/conexao.js";
import TipoConta from "../modelo/tipoConta.js";

export default class ContaDAO {
    
    constructor(){
        this.init();
    }

    async init(){
        try{
            const sql = "CREATE TABLE IF NOT EXISTS conta (id INT NOT NULL AUTO_INCREMENT, conta VARCHAR(100) NOT NULL, email VARCHAR(50), nome VARCHAR(100),nascimento DATE, senha varchar(50) NOT NULL, PRIMARY KEY (id))";
            const conexao = await conectarBanco();
            const resultado = await conexao.execute(sql);
            liberarConexao(conexao);
            console.log("Tabela conta iniciada com sucesso!");
        }catch(erro){
            console.log("Não foi possível iniciar a tabela conta: "+erro);
        }
    }
    async gravar(conta) {
        if (conta instanceof Conta) {
            const sql = "INSERT INTO conta (conta, email, nome, nascimento, senha) VALUES (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'), sha1(?))";
            const data = new Date(conta.nascimento);
            const parametros = [conta.email, conta.nome, data.toLocaleDateString("pt-BR"), conta.senha];
            const conexao = await conectarBanco();
            const resultado = await conexao.execute(sql, parametros);
            conta.id = resultado[0].insertId;
            liberarConexao(conexao);
        }
    }

    async alterar(conta) {
        if (conta instanceof Conta) {
            const sql = "UPDATE conta SET conta = ?, email = ?, nome = ?, senha = sha1(?) WHERE id = ? and senha = sha1(?)";
            const parametros = [conta.email, conta.nome, conta.senha, conta.id, conta.senha];
            const conexao = await conectarBanco();
            await conexao.execute(sql, parametros);
            liberarConexao(conexao);
        }
    }

    async excluir(conta) {
        if (conta instanceof Conta) {
            const sql = "DELETE FROM conta WHERE id = ? and senha = sha1(?)";
            const conexao = await conectarBanco();
            await conexao.execute(sql, [conta.id, conta.senha]);
            liberarConexao(conexao);
        }
    }

    async consultar(termo) {
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo || ""))) {
            sql = `SELECT c.id, c.conta, c.email, c.nome, c.nascimento, c.senha,
            m.id as id_mensagem, m.dataHora, m.lida, m.mensagem, m.id_conta 
            FROM conta c
            LEFT JOIN mensagens m ON c.id = m.id_conta
            WHERE c.conta LIKE ?
            ORDER BY m.dataHora ASC`;
            parametros.push(`%${termo}%`);
        } else {
            ///////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAA
            sql = sql = `SELECT c.id, c.conta, c.email, c.nome, c.nascimento, c.senha,
                         m.id as id_mensagem, m.dataHora, m.lida, m.mensagem, m.id_conta 
            FROM conta c
            LEFT JOIN tipoConta t ON c.id = t.id
            WHERE c.id = ?
            ORDER BY t.dataHora ASC`;;
            parametros.push(termo);
        }

        const conexao = await conectarBanco();
        const [linhas, campos] = await conexao.execute(sql, parametros);
        const registros = linhas.reduce((grupos, item) => {
            const grupo = grupos[item.id] || [];
            grupo.push(item);
            grupos[item.id] = grupo;
            return grupos;
        }, {});

        let contas = [];
        for (const [key, registro] of Object.entries(registros)) {
            let tipoConta = [];
            for (const linha of registro) {
                if (linha.id_tipoConta){
                    const tipoConta = new TipoConta(linha.id_tipoConta, linha.lida, linha.tipoConta, linha.dataHora, {});
                    tipoConta.push(tipoConta);
                }
            }
            const conta = new Conta(registro[0].id, registro[0].conta, registro[0].email, registro[0].nome, registro[0].nascimento, registro[0].senha, tipoConta);
            contas.push(conta)
        }
        liberarConexao(conexao);
        return contas;
    }

    async verificarSenha(conta, senha) {
        const sql = "SELECT id FROM conta WHERE conta = ? and senha = sha1(?)";
        const conexao = await conectarBanco();
        const [linhas, campos] = await conexao.execute(sql, [conta, senha]);
        liberarConexao(conexao);
        return linhas.length > 0;
    }
}*/