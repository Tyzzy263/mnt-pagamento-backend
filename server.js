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

  // Aqui você pode salvar o pedido em banco ou enviar por e-mail
  res.status(200).json({
    mensagem: 'Pedido recebido com sucesso!',
    dados: { nome, numero, pacote }
  });
});

// Rota para receber notificações de pagamento (webhook)
app.post('/webhook-pagamento', (req, res) => {
  const pagamento = req.body;

  if (!pagamento.transacao_id || !pagamento.status || !pagamento.valor) {
    return res.status(400).json({ erro: 'Dados incompletos no webhook.' });
  }

  console.log('Notificação de pagamento recebida:', pagamento);

  // Aqui pode atualizar status no banco ou processar pedido

  res.status(200).json({ mensagem: 'Webhook recebido com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
