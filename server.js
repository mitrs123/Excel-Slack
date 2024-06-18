const axios = require('axios');

const slackToken = process.env.SLACKTOKEN;

run().catch(err => console.log(err));

async function run() {
  const url = 'https://slack.com/api/chat.postMessage';
  const res = await axios.post(url, {
    channel: '#test',
    text: 'Hello, World!'
  }, { headers: { authorization: `Bearer ${slackToken}` } });

  console.log('Done', res.data);
}