import express from 'express';
import { getCategoryFurniture, getHeroFurniture, getNewArrival } from '../controllers/homePageController.js';
import { methodNotAllowed } from '../utils/methodNot Allowed.js';



const router = express.Router();

router.route('/home/hero').get(getHeroFurniture).all(methodNotAllowed);
router.route('/home/category').get(getCategoryFurniture).all(methodNotAllowed);
router.route('/home/new').get(getNewArrival).all(methodNotAllowed);

export default router;