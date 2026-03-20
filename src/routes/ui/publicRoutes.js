const express = require('express');
const router = express.Router();




// Render registration page
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;