const db = require('../db');

// Listar todas as obras
exports.listarObras = (req, res) => {
  db.query('SELECT * FROM obras', (err, results) => {
    if (err) {
      console.error('Erro ao listar obras:', err);
      return res.status(500).json({ erro: 'Erro ao listar obras' });
    }
    res.json(results);
  });
};

// Criar nova obra
exports.criarObra = (req, res) => {
  console.error('criarObra inicio');
  const { nome, localizacao, cliente, data_inicio, data_fim } = req.body;
  const query = 'INSERT INTO obras (nome, localizacao, cliente, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nome, localizacao, cliente, data_inicio, data_fim], (err, result) => {
    if (err) {
      console.error('Erro ao criar obra:', err);
      return res.status(500).json({ erro: 'Erro ao criar obra' });
    }
    res.status(201).json({ mensagem: 'Obra criada com sucesso', id: result.insertId });
  });
};

exports.buscarObraPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM obras WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar obra' });
    if (results.length === 0) return res.status(404).json({ erro: 'Obra não encontrada' });
    res.json(results[0]);
  });
};

exports.atualizarObra = (req, res) => {
  const { id } = req.params;
  const { nome, localizacao, cliente, data_inicio, data_fim } = req.body;
  db.query(
    'UPDATE obras SET nome = ?, localizacao = ?, cliente = ?, data_inicio = ?, data_fim = ? WHERE id = ?',
    [nome, localizacao, cliente, data_inicio, data_fim, id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar obra' });
      res.json({ mensagem: 'Obra atualizada com sucesso' });
    }
  );
};

exports.deletarObra = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM obras WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar obra' });
    res.json({ mensagem: 'Obra deletada com sucesso' });
  });
};

