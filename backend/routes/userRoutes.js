import express from 'express';
import { methodNotAllowed } from '../utils/methodNot Allowed.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validator.js';
import { loginSchema, registerSchema } from '../utils/schema/userSchema.js';
import { login, register } from '../controllers/userController.js';
import { contactSchema } from '../utils/schema/contactSchema.js';
import { createContact, deleteContact, getContact } from '../controllers/contactController.js';
import { adminCheck, protect } from '../middlewares/protect.js';


const router = express.Router();

router.route('/users/register').post(upload().multerUpload.none(), validateBody(registerSchema), register).all(methodNotAllowed);

router.route('/users/login').post(upload().multerUpload.none(), validateBody(loginSchema), login).all(methodNotAllowed);

router.route('/contacts').get(protect, adminCheck, getContact).post(validateBody(contactSchema), createContact).all(methodNotAllowed);
router.route('/contacts/:id').delete(deleteContact).all(methodNotAllowed);

export default router;