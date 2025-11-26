// Clickjacking Protection
// Attackers loads your site in an iframe and tricks users into clicking on invisible elements.

const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 3002;

// Use Helmet to set X-Frame-Options header to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

app.get("/", (req, res) => {
    res.send(`
        <h1>Clickjacking Protection Example</h1>
        <p>This page cannot be embedded in an iframe due to X-Frame-Options header.</p>
    `);
});

app.listen(port, () => {
    console.log(`Clickjacking protection app listening at http://localhost:${port}`);
});