const express = require('express');
const xssController = require('../controllers/xss');

const router = express.Router();

router.get('/xss',xssController.getXss);
router.post('/xss',xssController.postXss);
router.get('/reflectedXss',xssController.getReflectedXss);
router.post('/reflectedXss',xssController.postReflectedXss);

module.exports = router;