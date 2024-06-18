const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { config } = require('dotenv');
config();

const app = express();
const PORT = process.env.PORT || 3000;
const slackToken = process.env.SLACKTOKEN;

app.use(bodyParser.json());

app.post('/notify', async (req, res) => {
  const { taskName } = req.body;

  try {
    const url = 'https://slack.com/api/chat.postMessage';
    const response = await axios.post(url, {
      channel: '#test',  // Change to your desired Slack channel name
      text: `Task "${taskName}" is marked as done.`
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${slackToken}`
      }
    });

    if (response.data.ok) {
      res.status(200).send('Notification sent.');
    } else {
      console.error('Slack API error:', response.data.error);
      res.status(500).send('Failed to send notification.');
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Failed to send notification.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});