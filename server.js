require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());
app.use(cors());

const CLIENT_ID = process.env.E2_CLIENT_ID;
const CLIENT_SECRET = process.env.E2_CLIENT_SECRET;

app.post('/api/pagar', async (req, res) => {
  const { numero, valor, operador } = req.body;

  try {
    const authResponse = await fetch('https://api.e2pay.co.mz/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      })
    });

    const { access_token } = await authResponse.json();

    const pagamento = await fetch('https://api.e2pay.co.mz/v1/c2b', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero,
        valor,
        operador
      })
    });

    const resultado = await pagamento.json();
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao processar pagamento', detalhes: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
