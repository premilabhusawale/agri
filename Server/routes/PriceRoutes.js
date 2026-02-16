

const express         = require('express');
const router          = express.Router();
const PriceController = require('../controllers/PriceController');


router.get('/test',        PriceController.testApiKey);
router.get('/debug',       PriceController.debugRaw);
router.get('/commodities', PriceController.getCommodities);
router.get('/',            PriceController.getPrices);

module.exports = router;