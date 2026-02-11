import express from "express";
import authenticate from "../middlewares/Authenticate.js";
import RatingController from "../controllers/RatingController.js";

const router = express.Router();


router.post("/", authenticate,RatingController.createRating);

router.get("/product/:productId", RatingController.getAllRatings);

router.put("/:ratingId",authenticate,RatingController.updateRating);

router.delete("/:ratingId",authenticate,RatingController.deleteRating);

export default router;