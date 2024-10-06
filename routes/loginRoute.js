const express = require('express');
const router = express.Router();

// GET route for rendering the login form
router.get('/login', (req, res) => {
    res.render('login'); // Render the login form
});

// POST route for processing login
router.post('/login', (req, res) => {
    const { name } = req.body;

    // Simple login logic (You can replace this with actual authentication logic)
    if (!name || name.trim() === "") {
        return res.status(400).render('login', { error: 'Name is required.' });
    }

    // Store user's name in the session
    req.session.name = name;

    // Redirect to the index page after login
    res.redirect('/');
});

// GET route for rendering the index page after login
router.get('/', (req, res) => {
    // Only allow access if user is logged in (i.e., name exists in session)
    if (!req.session.name) {
        return res.redirect('/login');
    }

    res.render('index', { name: req.session.name });
});

module.exports = router;

