// education/education.routes.js
const express = require('express');
const router = express.Router();
const educationController = require('./education.controller');

// Endpoint: GET /api/education/programs
router.get('/programs', educationController.getAllPrograms);

// Endpoint: GET /api/education/programs/:id
router.get('/programs/:id', educationController.getProgramById);

// Endpoint: POST /api/education/register
router.post('/register', educationController.registerProgram);

module.exports = router;