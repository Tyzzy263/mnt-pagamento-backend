const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor da Casa de dados de MNT está online!');
});

// Rota para criar pedidos
app.post('/pedido', (req, res) => {
  const { nome, numero, pacote } = req.body;

  if (!nome || !numero || !pacote) {
    return res.status(400).json({ erro: 'Por favor, preencha todos os campos.' });
  }

  // Aqui você poderia salvar o pedido em um banco ou enviar por e-mail
  res.status(200).json({
    mensagem: 'Pedido recebido com sucesso!',
    dados: {
      nome,
      numero,
      pacote
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
