const db = require('../db');

// Listar todos
exports.listarEtapas = (req, res) => {
  db.query('SELECT * FROM etapas', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar etapas' });
    res.json(results);
  });
};

// Criar novo
exports.criarEtapa = (req, res) => {
  const { nome, data_prevista, data_realizada, status, obra_id } = req.body;
  db.query(
    'INSERT INTO etapas (nome, data_prevista, data_realizada, status, obra_id) VALUES (?, ?, ?, ?, ?)',
    [nome, data_prevista, data_realizada, status, obra_id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criar etapa' });
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
};

exports.buscarEtapaPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM etapas WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar etapa' });
    if (results.length === 0) return res.status(404).json({ erro: 'Etapa não encontrada' });
    res.json(results[0]);
  });
};

exports.atualizarEtapa = (req, res) => {
  const { id } = req.params;
  const { nome, data_prevista, data_realizada, status } = req.body;
  db.query(
    'UPDATE etapas SET nome = ?, data_prevista = ?, data_realizada = ?, status = ? WHERE id = ?',
    [nome, data_prevista, data_realizada, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar etapa' });
      res.json({ mensagem: 'Etapa atualizada com sucesso' });
    }
  );
};

exports.deletarEtapa = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM etapas WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar etapa' });
    res.json({ mensagem: 'Etapa deletada com sucesso' });
  });
};
