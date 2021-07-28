const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const caminhoArq = path.resolve(__dirname,'../','../','database.db')
const db = new sqlite3.Database(caminhoArq)

const FUNCIONARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "FUNCIONARIOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(64),
    "EMAIL" varchar(64),
    "CARGO" varchar(64),
    "ENDERECO" varchar(64),
    "CPF" varchar(14),
    "IDADE" INTEGER,
    "TELEFONE" varchar(20) 
  )`

  const ADD_FUNCIONARIOS_DATA = `
INSERT INTO FUNCIONARIOS (NOME, EMAIL, CARGO, ENDERECO, CPF, IDADE, TELEFONE)
VALUES 
    ('Ruan Silva', 'rusilva@gmail.com', 'Vigia', 'Vila Nova, RJ', '145.694.312.17', 29, '(21) 99265-9662')`


function criaTabelaFuncionarios() {
    db.run(FUNCIONARIOS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de funcionários");
    });
}
    
    
function populaTabelaFuncionarios() {
    db.run(ADD_FUNCIONARIOS_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de funcionários");
    });
}

db.serialize( ()=> {
    criaTabelaFuncionarios();
    populaTabelaFuncionarios();
});