const express         = require('express');
const router          = express.Router();
const PriceController = require('../controllers/PriceController');

router.get('/prices/test',        PriceController.testApiKey);
router.get('/prices/debug',       PriceController.debugRaw);
router.get('/prices/commodities', PriceController.getCommodities);
router.get('/prices/',            PriceController.getPrices);

module.exports = router;