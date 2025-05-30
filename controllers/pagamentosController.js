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
  const query = `
    SELECT p.id, p.valor, p.data_pagamento, p.descricao,
      o.nome AS nome_obra,
      e.nome AS nome_etapa,
      c.nome AS nome_colaborador
    FROM pagamentos p
    JOIN obras o ON p.obra_id = o.id
    JOIN etapas e ON p.etapa_id = e.id
    JOIN colaboradores c ON p.colaborador_id = c.id
    ORDER BY p.data_pagamento DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao listar pagamentos:', err);
      return res.status(500).json({ erro: 'Erro ao listar pagamentos' });
    }
    res.json(results);
  });
};
