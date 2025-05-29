const db = require('../db');

// Listar todos
exports.listarColaboradores = (req, res) => {
  db.query('SELECT * FROM colaboradores', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar colaboradores' });
    res.json(results);
  });
};

// Criar novo
exports.criarColaborador = (req, res) => {
  const { nome, funcao, endereco, telefone, chave_pix, observacoes } = req.body;
  const query = `
    INSERT INTO colaboradores (nome, funcao, endereco, telefone, chave_pix, observacoes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nome, funcao, endereco, telefone, chave_pix, observacoes], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao criar colaborador' });
    res.status(201).json({ mensagem: 'Colaborador criado com sucesso', id: result.insertId });
  });
};
