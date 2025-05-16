const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Simulação de base de dados
const pedidos = [];

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor da Casa de dados de MNT está online!');
});

// Rota para criar um pedido
app.post('/comprar', (req, res) => {
  const { numero, pacote, metodoPagamento } = req.body;

  if (!numero || !pacote || !metodoPagamento) {
    return res.status(400).json({ erro: 'Preencha todos os campos!' });
  }

  const novoPedido = { id: pedidos.length + 1, numero, pacote, metodoPagamento, status: 'pendente' };
  pedidos.push(novoPedido);
  res.status(201).json({ mensagem: 'Pedido criado com sucesso!', pedido: novoPedido });
});

// Rota para listar pedidos (temporária, só para testes)
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
