const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para aceitar JSON nos pedidos

// Banco de dados em memória (temporário)
let pedidos = [];

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor da Casa de dados de MNT está online!');
});

// Rota para listar todos os pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Rota para criar um novo pedido
app.post('/pedidos', (req, res) => {
  const pedido = req.body;

  if (!pedido.nome || !pedido.numero || !pedido.pacote) {
    return res.status(400).json({ erro: 'Dados incompletos. Envie nome, número e pacote.' });
  }

  pedido.id = pedidos.length + 1;
  pedido.status = 'pendente';
  pedidos.push(pedido);

  res.status(201).json({ mensagem: 'Pedido criado com sucesso!', pedido });
});

// Rota para ver pedido por ID
app.get('/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return res.status(404).json({ erro: 'Pedido não encontrado' });
  }

  res.json(pedido);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
