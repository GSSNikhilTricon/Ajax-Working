const express = require('express');
const cors = require('cors')
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json())

let votes = { option1: 0, option2: 0 }

app.get('/', (req, res) => {
    res.send('Successfully connected');
})

app.post('/vote', (req, res) => {
    const vote = req.body.vote;
    if (vote && votes[vote] !== undefined) {
        votes[vote]++
        res.send('Successfully Voted to ' + vote)
    } else {
        res.status(400).send('Bad Req')
    }  
})

app.get('/results', (req, res) => {
    res.json(votes)
})

app.delete('/vote', (req, res) => {
    const vote = req.body.vote;
    if (!vote || votes[vote] === undefined) {
        return res.status(400).send('Wrong Vote')
    } 

    if (votes[vote] === 0) {
        return res.send('Cannot decrease votes below 0')
    }

    votes[vote]--
    res.send('Successfully deleted one vote of ' + vote)
})

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
//   console.log(`🌎 APP_ENV: ${process.env.APP_ENV}`);
//   console.log(`👋 GREETING: ${process.env.GREETING}`);
//   console.log(`🔑 FAKE_KEY: ${process.env.FAKE_KEY}`);
});
