const db = require('../db');

exports.getAllUsuarios = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
    res.json(results);
  });
};

exports.createUsuario = (req, res) => {
  const { nome, email, senha, perfil } = req.body;
  db.query(
    'INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)',
    [nome, email, senha, perfil],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar usuário:', err);
        return res.status(500).json({ erro: 'Erro ao criar usuário' });
      }
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
    res.json(results[0]);
  });
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil } = req.body;
  db.query(
    'UPDATE usuarios SET nome = ?, email = ?, senha = ?, perfil = ? WHERE id = ?',
    [nome, email, senha, perfil, id],
    (err) => {
      if (err) {
        console.error('Erro ao atualizar usuário:', err);
        return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
      }
      res.json({ mensagem: 'Usuário atualizado com sucesso' });
    }
  );
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
    res.json({ mensagem: 'Usuário deletado com sucesso' });
  });
};

