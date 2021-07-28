class FuncionariosDAO {
  constructor(db) {
    this.db = db;
  }

  getAllFuncionarios() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM FUNCIONARIOS", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getFuncionarios(id) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM FUNCIONARIOS WHERE id = ?", id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  insertFuncionario(funcionario) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO FUNCIONARIOS(nome, email, cargo, endereco, cpf, idade, telefone) VALUES (?,?,?,?,?,?,?)`,
        Object.values(funcionario),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  deleteFuncionario(funcionarioId) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM FUNCIONARIOS WHERE id = ?`, funcionarioId, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  updateFuncionario(nome, email, cargo, endereco, cpf, idade, telefone) {
    if (nome || email || cargo || endereco || cpf || idade || telefone) {
      let virgula = false
      let newArray = []
      let sql = 'UPDATE FUNCIONARIOS SET '

      if (nome) {
        sql = sql + ' NOME = ?'
        virgula = true
        newArray.push(nome)
      }

      if (email) {
        if (virgula)
          sql = sql + ',EMAIL = ?'
        else {
          sql = sql + 'EMAIL = ?'
          virgula = true
        }
        newArray.push(email)
      }

      if (cargo) {
        if (virgula)
          sql = sql + ',CARGO = ?'
        else {
          sql = sql + 'CARGO = ?'
          virgula = true
        }
        newArray.push(cargo)
      }

      if (endereco) {
        if (virgula)
          sql = sql + ',ENDERECO = ?'
        else {
          sql = sql + 'ENDERECO = ?'
          virgula = true
        }
        newArray.push(endereco)
      }

      if (cpf) {
        if (virgula)
          sql = sql + ',CPF = ?'
        else {
          sql = sql + 'CPF = ?'
          virgula = true
        }
        newArray.push(cpf)
      }

      if (idade) {
        if (virgula)
          sql = sql + ',IDADE = ?'
        else {
          sql = sql + 'IDADE = ?'
          virgula = true
        }
        newArray.push(idade)
      }

      if (telefone) {
        if (virgula)
          sql = sql + ',TELEFONE = ?'
        else {
          sql = sql + 'TELEFONE = ?'
          virgula = true
        }
        newArray.push(telefone)
      }

      sql = sql + 'WHERE id = ?'
      newArray.push(id)
      return new Promise((resolve, reject) => {
        this.db.run(sql, newArray, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } else
      throw new Error('Nenhum atributo (nome, email, cargo, endereco, cpf, idade ou telefone) foi enviado')
  }
}

module.exports = FuncionariosDAO;