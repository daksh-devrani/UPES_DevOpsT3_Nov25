// SESSION & COKKIE SECURITY

/*
express-session - for session management
cookie-parser - for cookie parsing and security
Cookie options:
- httpOnly: true (prevents client-side JS from accessing the cookie)
- secure: true (ensures cookie is sent over HTTPS only)
- sameSite: 'Strict' or 'Lax' (prevents CSRF attacks)
*/

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3002;

app.use(cookieParser());

app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true, // JS Cannot access the cookie
            secure: false, // Set to true if using HTTPS
            sameSite: 'strict', // prevents CSRF
        },
    })
);

app.get('/', (req, res) => {
    if (!req.session.views) {
        req.session.views = 1;
    } else {
        req.session.views++;
    }
    res.send(`Number of views: ${req.session.views}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});