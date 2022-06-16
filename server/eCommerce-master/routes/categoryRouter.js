import express from 'express';
import auth from '../middleware/authMiddleware.js';
import authAdmin from '../middleware/authAdminMWare.js';
import {
  getCategories,
  addCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
const categoryRouter = express.Router();
categoryRouter.get('/category', getCategories);
categoryRouter.post('/category', auth, authAdmin, addCategory);
categoryRouter.delete('/category/:id', auth, authAdmin, deleteCategory);
export default categoryRouter;
