const express = require ("express");
const authenticate = require ("../Middleware/Authenticate.js");
const RatingController = require ("../controllers/RatingController.js");

const router = express.Router();


router.post("/rating/create", authenticate,RatingController.createRating);

router.get("/rating/:productId", RatingController.getAllRatings);

router.put("/rating/:ratingId",authenticate,RatingController.updateRating);


module.exports = router;