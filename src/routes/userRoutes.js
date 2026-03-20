const router = require('express').Router();
const { getProfile } = require('../controllers/userCtrl');

router.get('/profile', getProfile);

module.exports = router;
