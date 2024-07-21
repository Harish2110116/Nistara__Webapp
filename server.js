import express from 'express';
import fetch from 'node-fetch'; // Import node-fetch
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

app.get('/proxy/alerts', async (req, res) => {
  const url = 'https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text(); // Get the response as text
    res.send(data);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).send('Error fetching alerts');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
