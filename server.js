const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Importar rotas
const obrasRoutes = require('./routes/obras');

// Rotas
app.use('/obras', obrasRoutes);
app.use('/etapas', require('./routes/etapas'));
app.use('/gastos', require('./routes/gastos'));
app.use('/usuarios', require('./routes/usuarios'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




