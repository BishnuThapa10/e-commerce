import express from 'express';
import { methodNotAllowed } from '../utils/methodNot Allowed.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validator.js';
import { loginSchema, registerSchema } from '../utils/schema/userSchema.js';
import { login, register } from '../controllers/userController.js';


const router = express.Router();

router.route('/users/register').post(upload().multerUpload.none(), validateBody(registerSchema), register).all(methodNotAllowed);

router.route('/users/login').post(upload().multerUpload.none(), validateBody(loginSchema), login).all(methodNotAllowed);

export default router;