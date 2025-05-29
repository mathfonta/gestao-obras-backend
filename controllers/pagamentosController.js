const db = require('../db');

exports.criarPagamento = (req, res) => {
  const { obra_id, etapa_id, colaborador_id, valor, data_pagamento, descricao } = req.body;
  const query = `INSERT INTO pagamentos (obra_id, etapa_id, colaborador_id, valor, data_pagamento, descricao)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [obra_id, etapa_id, colaborador_id, valor, data_pagamento, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao registrar pagamento:', err);
      return res.status(500).json({ erro: 'Erro ao registrar pagamento' });
    }
    res.status(201).json({ mensagem: 'Pagamento registrado com sucesso', id: result.insertId });
  });
};

exports.listarPagamentos = (req, res) => {
  const query = `SELECT pagamentos.*, obras.nome AS nome_obra, etapas.nome AS nome_etapa, colaboradores.nome AS nome_colaborador
                 FROM pagamentos
                 JOIN obras ON pagamentos.obra_id = obras.id
                 JOIN etapas ON pagamentos.etapa_id = etapas.id
                 JOIN colaboradores ON pagamentos.colaborador_id = colaboradores.id
                 ORDER BY pagamentos.data_pagamento DESC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao listar pagamentos:', err);
      return res.status(500).json({ erro: 'Erro ao listar pagamentos' });
    }
    res.json(results);
  });
};
