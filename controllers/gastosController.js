const db = require('../db');

exports.getAllGastos = (req, res) => {
  db.query('SELECT * FROM gastos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar gastos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar gastos' });
    }
    res.json(results);
  });
};

exports.createGasto = (req, res) => {
  const { tipo, descricao, valor, data, fornecedor, etapa_id } = req.body;
  db.query(
    'INSERT INTO gastos (tipo, descricao, valor, data, fornecedor, etapa_id) VALUES (?, ?, ?, ?, ?, ?)',
    [tipo, descricao, valor, data, fornecedor, etapa_id],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar gasto:', err);
        return res.status(500).json({ erro: 'Erro ao criar gasto' });
      }
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.getGastoById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM gastos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar gasto:', err);
      return res.status(500).json({ erro: 'Erro ao buscar gasto' });
    }
    res.json(results[0]);
  });
};

exports.updateGasto = (req, res) => {
  const { id } = req.params;
  const { tipo, descricao, valor, data, fornecedor, etapa_id } = req.body;
  db.query(
    'UPDATE gastos SET tipo = ?, descricao = ?, valor = ?, data = ?, fornecedor = ?, etapa_id = ? WHERE id = ?',
    [tipo, descricao, valor, data, fornecedor, etapa_id, id],
    (err) => {
      if (err) {
        console.error('Erro ao atualizar gasto:', err);
        return res.status(500).json({ erro: 'Erro ao atualizar gasto' });
      }
      res.json({ mensagem: 'Gasto atualizado com sucesso' });
    }
  );
};

exports.deleteGasto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM gastos WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao deletar gasto:', err);
      return res.status(500).json({ erro: 'Erro ao deletar gasto' });
    }
    res.json({ mensagem: 'Gasto deletado com sucesso' });
  });
};
