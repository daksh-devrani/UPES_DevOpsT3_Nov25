// CSP Example
/*
express - for serving the web application
helmet - for setting various HTTP headers for security

This blocks inline javaScript and other potentially harmful content
*/

const express = require('express');
const helmet = require('helmet');

const app = express();
const port = 3001;

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],  // blocks inline JavaScript
            styleSrc: ["'self'"], 
            imgSrc: ["'self'"]
        }
    })
);

app.get("/", (req, res) => {
    res.send(`
        <h1>Content Security Policy Example</h1>
        <script>
            // This inline script will be blocked by CSP
            alert('This inline script is blocked by CSP!');
        </script>
        <p>If you see an alert, CSP is not working correctly.</p>
    `);
});

app.listen(port, () => {
    console.log(`CSP example app listening at http://localhost:${port}`);
});