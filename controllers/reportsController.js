const db = require('../db');

exports.getRelatorioFinanceiro = (req, res) => {
  const query = `
    SELECT o.nome AS obra, e.nome AS etapa, e.orcamento_previsto, 
           SUM(g.valor) AS gasto_real,
           (e.orcamento_previsto - SUM(g.valor)) AS diferenca
    FROM obras o
    JOIN etapas e ON o.id = e.obra_id
    LEFT JOIN gastos g ON e.id = g.etapa_id
    GROUP BY e.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao gerar relatório:', err);
      return res.status(500).json({ erro: 'Erro ao gerar relatório' });
    }
    res.json(results);
  });
};
