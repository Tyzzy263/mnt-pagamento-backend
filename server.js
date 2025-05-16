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
