const db = require('../db');

exports.getAlertas = (req, res) => {
  const query = 'SELECT * FROM alertas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar alertas:', err);
      return res.status(500).json({ erro: 'Erro ao buscar alertas' });
    }
    res.json(results);
  });
};

exports.createAlerta = (req, res) => {
  const { tipo, mensagem, data, obra_id } = req.body;
  const query = 'INSERT INTO alertas (tipo, mensagem, data, obra_id) VALUES (?, ?, ?, ?)';
  db.query(query, [tipo, mensagem, data, obra_id], (err, result) => {
    if (err) {
      console.error('Erro ao criar alerta:', err);
      return res.status(500).json({ erro: 'Erro ao criar alerta' });
    }
    res.status(201).json({ id: result.insertId, tipo, mensagem, data, obra_id });
  });
};
