const express = require('express');
const { getReview } = require('../controllers/ai.controllers');
const router = express.Router();


router.post("/get-review",getReview)


module.exports = router;