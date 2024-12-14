const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    // Extract the 'id' parameter from the request
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ error: "Missing 'id' query parameter" });
    }

    // Construct the target URL
    const targetUrl = `https://files.directserver.workers.dev/pixeldrain.php?id=${id}`;

    // Make the GET request
    const response = await axios.get(targetUrl, { responseType: 'text' }); // Use 'stream' or 'text' as needed

    // Send the response to the client
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
