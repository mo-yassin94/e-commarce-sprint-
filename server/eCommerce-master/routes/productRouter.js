import express from 'express';
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByAny,
} from '../controllers/productController.js';
import auth from '../middleware/authMiddleware.js';
import authAdmin from '../middleware/authAdminMWare.js';
const productRouter = express.Router();
productRouter.get('/:any', getProductsByAny);
productRouter.get('/', getProducts);
productRouter.post('/', auth, authAdmin, createProduct);
productRouter.delete('/:id', auth, authAdmin, deleteProduct);
productRouter.put('/:newimg/:oldimg', auth, authAdmin, updateProduct);




export default productRouter;
