const express = require('express');
const { getResponse } = require('../controllers/ai.controllers');
const router = express.Router();


router.get("/get-reponse",getResponse)


module.exports = router;