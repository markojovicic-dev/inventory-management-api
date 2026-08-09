import express from 'express';

const app = express()

app.get('/', (req, res) => {
    console.log('consoleee')
    res.json('Hello');
});

app.listen(3000, () => console.log('Listening on port 3000'))
