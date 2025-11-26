// XSS Example
/*
express - for serving the web application
body-parser - for parsing incoming request bodies
*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Vulnerable endpoint
app.post("/vulnerable", (req, res) => {
    const comment = req.body.comment;
    res.send(`<h1>Your Comment</h1><p>${comment}</p>`);
});

// Safe endpoint with sanitization
app.post("/safe", (req, res) => {
    const comment = req.body.comment;
    const sanitizedComment = comment.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    res.send(`<h1>Your Comment</h1><p>${sanitizedComment}</p>`);
});

app.get("/", (req, res) => {
    res.send(`
        <form method="POST" action="/vulnerable">
            <label for="comment">Vulnerable Comment:</label><br>
            <input type="text" id="comment" name="comment"><br>
            <input type="submit" value="Submit">
        </form>
        <form method="POST" action="/safe">
            <label for="comment">Safe Comment:</label><br>
            <input type="text" id="comment" name="comment"><br>
            <input type="submit" value="Submit">
        </form>
    `);
});

app.listen(port, () => {
    console.log(`XSS example app listening at http://localhost:${port}`);
});