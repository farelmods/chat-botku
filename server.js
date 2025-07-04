const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public')); // Untuk file HTML/JS
app.use(express.json()); // Untuk parsing JSON dari frontend

// Endpoint /chat
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'Pesan kosong atau tidak valid' });
  }

  try {
    const response = await axios.get(
      `https://api.diioffc.web.id/api/ai/esia?query=${encodeURIComponent(userMessage)}`
    );

    const data = response.data;
    console.log('[DEBUG] Respon API:', data);

    // ✅ Kirim hanya isi string-nya saja, tanpa objek
    if (data.status && data.result && data.result.message) {
      res.json({ reply: data.result.message }); // Hanya string!
    } else {
      res.status(500).json({ error: 'Jawaban AI kosong atau tidak valid' });
    }

  } catch (error) {
    console.error('[ERROR]', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghubungi API' });
  }
});

// ✅ Inisialisasi server
app.listen(3000, () => {
  console.log('✅ Server aktif di http://localhost:3000');
});
