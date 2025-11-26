// CSRF Example
/*
express - for serving the web application
cookie-parser - for parsing cookies
csurf - for CSRF protection
*/

const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CSRF protection middleware
const csrfProtection = csurf({ cookie: true });

app.get("/", csrfProtection, (req, res) => {
    res.send(`
        <h1>CSRF Protection Example</h1>
        <form method="POST" action="/transfer" >
            <input type="hidden" name="_csrf" value="${req.csrfToken()}">
            Amount: <input type="text" name="amount"><br>
            <button type="submit">Transfer</button>
        </form>
    `);
})

app.post("/transfer", cookieParser(), csrfProtection, (req, res) => {
    res.send("Transfer of " + req.body.amount + " completed successfully!");
});

app.listen(port, () => {
    console.log(`CSRF example app listening at http://localhost:${port}`);
});