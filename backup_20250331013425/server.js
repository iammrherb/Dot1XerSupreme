require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// ChatGPT API endpoint
app.post('/api/generateConfig', async (req, res) => {
  const configData = req.body;
  const prompt = \`Generate a network configuration based on the following data:\n\${JSON.stringify(configData, null, 2)}\nProvide suggestions for improvement:\n\`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });
    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    res.json({ config: generatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate configuration' });
  }
});

// Serve static files from the current directory (for production build)
app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, () => {
  console.log(\`Server listening on port \${PORT}\`);
});
