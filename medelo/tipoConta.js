import TipoContaDAO from "../persistencia/TipoContaDAO.js";

export default class TipoConta {
    #id;
    #descricao;

    constructor(id, descricao) {
        this.#id = id;
        this.#descricao = descricao;
    }   

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(descricao) {
        this.#descricao = descricao;
    }

    toJSON() {
        return {
            id: this.#id,
            descricao: this.#descricao
        };
    }

    async incluir() {
        const tipoContaDAO = new TipoContaDAO();
        await tipoContaDAO.gravar(this);
    }

    async alterar() {
        const tipoContaDAO = new TipoContaDAO();
        await tipoContaDAO.alterar(this);
    }

    async excluir() {
        const tipoContaDAO = new TipoContaDAO();
        await tipoContaDAO.excluir(this);
    }

    async consultar(termo) {
        const tipoContaDAO = new TipoContaDAO();
        return await tipoContaDAO.consultar(termo);
    }
}
