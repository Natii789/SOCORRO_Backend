import Conta from "../modelo/conta.js";

export default class ContaCTRL {

    gravar(req, res) {
        res.type('application/json');
        if (req.method == 'POST' && req.is('application/json')) {
            const dados = req.body;
            const email = dados.email;
            const nome = dados.nome;
            const nascimento = dados.nascimento;
            const tipoContaId = dados.tipoContaId;
            const senha = dados.senha;

            if (email && nome && nascimento && tipoContaId && senha) {
                const conta = new Conta(0, email, nome, nascimento, tipoContaId, senha);
                conta.incluir().then(() => {
                    res.status(200).json({
                        status: true,
                        id: conta.id,
                        mensagem: 'Conta criada com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao criar a conta: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados da conta (email, nome, nascimento, tipoContaId, senha)!'
                });
            }

        } else {
            res.status(400).json({
                status: false,
                mensagem: 'Requisição inválida!'
            });
        }
    }

    alterar(req, res) {
        res.type('application/json');
        if ((req.method == 'PUT' || req.method == 'PATCH') && req.is('application/json')) {
            const dados = req.body;
            const id = dados.id;
            const email = dados.email;
            const nome = dados.nome;
            const nascimento = dados.nascimento;
            const tipoContaId = dados.tipoContaId;
            const senha = dados.senha;

            if (id && email && nome && nascimento && tipoContaId && senha) {
                const conta = new Conta(id, email, nome, nascimento, tipoContaId, senha);
                conta.alterar().then(() => {
                    res.status(200).json({
                        status: true,
                        mensagem: 'Conta atualizada com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao atualizar a conta: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados da conta (id, email, nome, nascimento, tipoContaId, senha)!'
                });
            }

        } else {
            res.status(400).json({
                status: false,
                mensagem: 'Requisição inválida!'
            });
        }
    }

    excluir(req, res) {
        res.type('application/json');
        if (req.method == 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            const id = dados.id;
            const senha = dados.senha;

            if (id && senha) {
                const conta = new Conta(id, '', '', null, null, senha); // Não é necessário fornecer o email e outros dados
                conta.excluir().then(() => {
                    res.status(200).json({
                        status: true,
                        mensagem: 'Conta excluída com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao excluir a conta: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados da conta (id, senha)!'
                });
            }

        } else {
            res.status(400).json({
                status: false,
                mensagem: 'Requisição inválida!'
            });
        }
    }

    consultar(req, res) {
        res.type('application/json');
        let termo = req.params.termo;
        if (!termo) {
            termo = "";
        }
        if (req.method == 'GET') {
            const conta = new Conta(0, '', '', null, 0, ''); // Não importa o id para a consulta
            conta.consultar(termo).then((contas) => {
                res.status(200).json({
                    status: true,
                    listaContas: contas
                });
            })
                .catch((erro) => {
                    res.status(400).json({
                        status: false,
                        mensagem: 'Erro ao consultar as contas: ' + erro.message
                    });
                });
        } else {
            res.status(400).json({
                status: false,
                mensagem: 'Requisição inválida!'
            });
        }
    }

    verificarSenha(req, res) {
        res.type('application/json');
        if (req.method == 'POST' && req.is('application/json')) {
            const dados = req.body;
            const email = dados.email;
            const senha = dados.senha;

            if (email && senha) {
                const conta = new Conta(0, email, '', null, 0, senha); // O id não é necessário para verificação de senha
                conta.verificarSenha().then((senhaCorreta) => {
                    res.status(200).json({
                        status: true,
                        senhaCorreta: senhaCorreta,
                        mensagem: 'Senha verificada com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao verificar a senha: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados da conta (email, senha)!'
                });
            }

        } else {
            res.status(400).json({
                status: false,
                mensagem: 'Requisição inválida!'
            });
        }
    }
}
