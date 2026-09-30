const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// இது உங்க .exe file-ஐ நேரடியா டவுன்லோட் பண்ண அனுமதிக்கும்
app.get('/download/Dhiva-Pet-Setup-1.0.0.exe', (req, res) => {
  const filePath = path.join(__dirname, 'Dhiva-Pet-Setup-1.0.0.exe');
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
