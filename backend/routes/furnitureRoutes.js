import express from 'express';
import { upload } from '../middlewares/multer.js';
import { createData, getMultipleData, getSingleData, removeData, updateData } from '../controllers/furnitureController.js';
import { validateBody } from '../middlewares/validator.js';
import { furnitureValidationSchema } from '../utils/schema/createFurnitureSchema.js';
import { methodNotAllowed } from '../utils/methodNot Allowed.js';
import { furnitureUpdateValidationSchema } from '../utils/schema/updateFurnitureSchema.js';


const router = express.Router();

router.route('/furnitures')
.get(getMultipleData)
.post(upload("furnitures", {width: 700, height: 350, crop: "fill",maxSizeMb: 5}).multerUpload.array("images", 10), validateBody(furnitureValidationSchema),createData).all(methodNotAllowed);

router.route('/furnitures/:id')
.get(getSingleData)
.patch(upload("furnitures", {width: 700, height: 350, crop: "fill",maxSizeMb: 5}).multerUpload.array("images", 10), validateBody(furnitureUpdateValidationSchema),updateData)
.delete(removeData)
.all(methodNotAllowed);

export default router;