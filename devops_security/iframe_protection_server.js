// IFrame Protection
// Prevent your site from being embedded in iframes on other domains to protect against clickjacking.

const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 3002;

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            frameAncestors: ["'none'"]  // Prevents embedding in iframes
        }
    })
);

app.get("/", (req, res) => {
    res.send(`
        <h1>Clickjacking Protection Example</h1>
        <p>This page cannot be embedded in an iframe due to X-Frame-Options header.</p>
    `);
});

app.listen(port, () => {
    console.log(`Clickjacking protection app listening at http://localhost:${port}`);
});