import express from 'express';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validator.js';
import { orderValidationSchema } from '../utils/schema/orderSchema.js';
import { createOrder, getAllOrders } from '../controllers/orderController.js';
import { methodNotAllowed } from '../utils/methodNot Allowed.js';
import { protect } from '../middlewares/protect.js';



const router = express.Router();

router.route('/orders')
.get(getAllOrders)
.post(upload().multerUpload.none(), protect, validateBody(orderValidationSchema), createOrder).all(methodNotAllowed);

export default router;