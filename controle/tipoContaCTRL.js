import TipoConta from "../modelo/tipoConta.js";

export default class TipoContaCTRL {

    gravar(req, res) {
        res.type('application/json');
        if (req.method == 'POST' && req.is('application/json')) {
            const dados = req.body;
            const descricao = dados.descricao;

            if (descricao) {
                const tipoConta = new TipoConta(0, descricao);
                tipoConta.incluir().then(() => {
                    res.status(200).json({
                        status: true,
                        id: tipoConta.id,
                        mensagem: 'Tipo de conta criado com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao criar o tipo de conta: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados do tipo de conta (descricao)!'
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
            const descricao = dados.descricao;

            if (id && descricao) {
                const tipoConta = new TipoConta(id, descricao);
                tipoConta.alterar().then(() => {
                    res.status(200).json({
                        status: true,
                        mensagem: 'Tipo de conta atualizado com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao atualizar o tipo de conta: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados do tipo de conta (id, descricao)!'
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

            if (id) {
                const tipoConta = new TipoConta(id, '');
                tipoConta.excluir().then(() => {
                    res.status(200).json({
                        status: true,
                        mensagem: 'Tipo de conta excluído com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao excluir o tipo de conta: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados do tipo de conta (id)!'
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
            const tipoConta = new TipoConta(0, ''); // Não importa o id para a consulta
            tipoConta.consultar(termo).then((tipos) => {
                res.status(200).json({
                    status: true,
                    listaTipos: tipos
                });
            })
                .catch((erro) => {
                    res.status(400).json({
                        status: false,
                        mensagem: 'Erro ao consultar os tipos de conta: ' + erro.message
                    });
                });
        } else {
            res.status(400).json({
                status: false,
                mensagem: 'Requisição inválida!'
            });
        }
    }

    verificar(req, res) {
        res.type('application/json');
        if (req.method == 'POST' && req.is('application/json')) {
            const dados = req.body;
            const id = dados.id;

            if (id) {
                const tipoConta = new TipoConta(id, '');
                tipoConta.verificar().then((existe) => {
                    res.status(200).json({
                        status: true,
                        existe: existe,
                        mensagem: 'Verificação realizada com sucesso!'
                    });
                })
                    .catch((erro) => {
                        res.status(400).json({
                            status: false,
                            mensagem: 'Erro ao verificar o tipo de conta: ' + erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    status: false,
                    mensagem: 'Por favor, informe todos os dados do tipo de conta (id)!'
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
