const express = require('express');
const axios = require('axios');

const app = express();
const port = 8000; // Ganti port sesuai kebutuhan Anda

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Mobile Developer API' });
});

app.post('/upload', (req, res) => {
  // Tambahkan logika untuk mengunggah gambar ke API ML di sini
  res.json({ message: 'Image uploaded successfully' });
});

app.get('/predict', async (req, res) => {
  try {
    // Panggil endpoint API ML untuk mendapatkan prediksi
    const mlApiUrl = 'http://34.128.118.210:8000/docs';
    const mlApiResponse = await axios.get(mlApiUrl);

    // Proses respons dari API ML jika diperlukan
    const mobileApiResponse = {
      mlPrediction: mlApiResponse.data['model-prediction'],
      mlConfidenceScore: mlApiResponse.data['model-prediction-confidence-score'],
      filename: mlApiResponse.data.filename,
    };

    res.json(mobileApiResponse);
  } catch (error) {
    console.error('Error calling ML API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
