const express = require('express');
const { getExperts, getExpertById } = require('../controllers/expertController');
const { getExpertsValidation, expertIdValidation } = require('../middleware/validators');

const router = express.Router();

router.get('/', getExpertsValidation, getExperts);
router.get('/:id', expertIdValidation, getExpertById);

module.exports = router;
