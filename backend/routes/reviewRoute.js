import express from 'express';
import { getAllReviews, submitReview } from '../controllers/reviewController.js';
import { methodNotAllowed } from '../utils/methodNot Allowed.js';
import { upload } from '../middlewares/multer.js';
import { protect } from '../middlewares/protect.js';
import { validateBody } from '../middlewares/validator.js';
import { reviewValidationSchema } from '../utils/schema/reviewValidationSchema.js';


const router = express.Router();

router.route('/reviews').get(getAllReviews).all(methodNotAllowed);
router.route('/reviews/:id').post(upload().multerUpload.none(), protect, validateBody(reviewValidationSchema), submitReview).all(methodNotAllowed);

export default router;