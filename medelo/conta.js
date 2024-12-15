import ContaDAO from "../persistencia/ContaDAO.js";

export default class Conta{
    #id;
    #email ;
    #nome;
    #senha;
    #nascimento;
    #tipoContaId;

    constructor(id, email, nome, senha, nascimento, tipoContaId) {
        this.#id = id;
        this.#email = email;
        this.#nome = nome;
        //this.#senha = senha;
        this.#nascimento = nascimento;
        this.#tipoContaId = tipoContaId;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        this.#email = email;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get senha() {
        return this.#senha;
    }

    set senha(senha) {
        this.#senha = senha;
    }

    get nascimento() {
        return this.#nascimento;
    }

    set nascimento(nascimento) {
        this.#nascimento = nascimento;
    }

    get tipoContaId() {
        return this.#tipoContaId;
    }

    set tipoContaId(tipoContaId) {
        this.#tipoContaId = tipoContaId;
    }

    toJSON() {
        return {
            id: this.#id,
            email: this.#email,
            nome: this.#nome,
            nascimento: this.#nascimento,
            tipoContaId: this.#tipoContaId
        };
    }

    async incluir(){
        const contaDAO = new ContaDAO();
        await contaDAO.gravar(this);
    }

    async alterar(){
        const contaDAO = new ContaDAO();
        await contaDAO.alterar(this);
    }

    async excluir(){
        const contaDAO = new ContaDAO();
        await contaDAO.excluir(this);
    }

    async consultar(termo){
        const contaDAO = new ContaDAO();
        return await contaDAO.consultar(termo);
    }

    async verificarSenha(){
        const contaDAO = new ContaDAO();
        return await contaDAO.verificarSenha(this.email, this.senha);
    }
}
