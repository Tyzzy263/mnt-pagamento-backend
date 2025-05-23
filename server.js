const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ===================
// CONFIGURAÇÕES E2PAYMENTS
// ===================
const CLIENT_ID = '9eef3db8-cd7b-4560-8d16-952fb9239623';
const CLIENT_SECRET = 'yenrXNEmLcNg36JzIEpFLkCXnjhhTsaXHJgreDUS';

// Função para obter access token
async function obterTokenDeAcesso() {
  try {
    const resposta = await axios.post('https://api.e2payments.co.mz/oauth/token', {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });

    return resposta.data.access_token;
  } catch (erro) {
    console.error('Erro ao obter token:', erro.response?.data || erro.message);
    throw erro;
  }
}

// ===================
// ROTAS DO SERVIDOR
// ===================

// Rota principal
app.get('/', (req, res) => {
  res.send('Servidor da Casa de dados de MNT está online!');
});

// Rota para criar pedidos (sem pagamento ainda)
app.post('/pedido', (req, res) => {
  const { nome, numero, pacote } = req.body;

  if (!nome || !numero || !pacote) {
    return res.status(400).json({ erro: 'Por favor, preencha todos os campos.' });
  }

  res.status(200).json({
    mensagem: 'Pedido recebido com sucesso!',
    dados: { nome, numero, pacote }
  });
});

// Rota para testar o token de acesso
app.get('/testar-token', async (req, res) => {
  try {
    const token = await obterTokenDeAcesso();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter token' });
  }
});

// Rota para iniciar pagamento
app.post('/iniciar-pagamento', async (req, res) => {
  const { valor, numero, referencia } = req.body;

  if (!valor || !numero || !referencia) {
    return res.status(400).json({ erro: 'Preencha todos os campos: valor, numero e referencia.' });
  }

  try {
    const token = await obterTokenDeAcesso();

    const resposta = await axios.post(
      'https://api.e2payments.co.mz/api/payments/request',
      {
        amount: valor,
        mobile_number: numero,
        external_reference: referencia,
        service_provider: 'MPESA'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({
      mensagem: 'Pagamento iniciado com sucesso!',
      dados: resposta.data
    });
  } catch (erro) {
    console.error('Erro ao iniciar pagamento:', erro.response?.data || erro.message);
    res.status(500).json({ erro: 'Erro ao iniciar pagamento.' });
  }
});

// ===================
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
