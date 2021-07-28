const Funcionarios = require("../model/FuncionariosModel");
const FuncionariosDAO = require("../DAO/FuncionariosDAO");

module.exports = (app, db) => {
    let funcionariosBD = new FuncionariosDAO(db)

    app.get("/funcionarios", async (req, res) => {
        try {
            let resposta = await funcionariosBD.getAllFuncionarios();
            res.json({
                result: resposta
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });

    app.get("/funcionarios/:id", async (req, res) => {
        const {
            id
        } = req.params;
        try {
            if (parseInt(id)) {
                let resposta = await funcionariosBD.getFuncionarios(id);
                if (resposta) res.json(resposta);
                else {
                    throw new Error("Funcionário não encontrado");
                }
            } else {
                throw new Error("é esperado um ID tipo INT, tente novamente");
            }
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    });

    app.post("/funcionarios", async (req, res) => {
        const {
            nome,
            email,
            cargo,
            endereco,
            cpf,
            idade,
            telefone
        } = req.body;

        console.log(nome)
        let newFuncionario = new Funcionarios(nome, email, cargo, endereco, cpf, idade, telefone);
        try {
            await funcionariosBD.insertFuncionario(newFuncionario);
            res.status(201).json({
                message: "Funcionário inserido com sucesso",
                error: false,
            });
        } catch (err) {
            res.status(500).json({
                message: "Erro ao inserir funcionário",
                serverLog: err.message,
                error: true,
            });
        }
    });

    app.delete("/funcionarios/:id", async (req, res) => {
        const {
            id
        } = req.params;
        try {
            await funcionariosBD.deleteFuncionario(id);
            res.status(200).json({
                message: "Funcionário deletado com sucesso",
                error: false,
            });
        } catch (err) {
            res.status(500).json({
                message: "Erro ao deletar funcionário",
                serverLog: err.message,
                error: true,
            });
        }
    });

    app.put("/funcionario/:id", async (req, res) => {
        const {
            nome,
            email,
            cargo,
            endereco,
            cpf,
            idade,
            telefone
        } = req.body;

        const {
            id
        } = req.params;

        try {
            await funcionariosBD.updateFuncionario(id, nome, email, cargo, endereco, cpf, idade, telefone);
            res.status(200).json({
                message: "Funcionário atualizado com sucesso",
                error: false,
            });
        } catch (err) {
            res.status(500).json({
                message: "Erro ao atualizar o dados do funcionário",
                serverLog: err.message,
                error: true,
            });
        }
    });

}