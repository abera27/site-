const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let lastLocation = null;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

app.post('/save-location', (req, res) => {
  const { latitude, longitude } = req.body;
  lastLocation = { latitude, longitude, time: new Date().toLocaleString() };
  res.send('位置情報を保存しました');
});

app.post('/admin/location', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "認証失敗" });
  }
  res.json(lastLocation || { message: "データなし" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
