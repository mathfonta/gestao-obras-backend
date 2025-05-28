const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // seu usuário do MariaDB
  password: '962198',            // sua senha, se tiver
  database: 'gestao_obras' // nome do banco criado no HeidiSQL
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso!');
});

module.exports = connection;

