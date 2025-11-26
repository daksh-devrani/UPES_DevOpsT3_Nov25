// Basic Auth Example

/*
Express - for server
express-basic-auth - for basic authentication middleware
*/

const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = 3001;

app.use(
    basicAuth({
        users: { 'admin': 'password123' },
        challenge: true,
    })
)

app.get('/', (req, res) => {
    res.send('Welcome, authenticated user...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});