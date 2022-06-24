import mongoose from 'mongoose';
import Products from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { product_id, title, price, description, images, category } =
      req.body;
    const oldProduct = await Products.findOne({ product_id });
    if (oldProduct)
      return res.status(400).json({ msg: 'This product already exists' });
    const newProduct = await Products.create({
      product_id,
      title,
      price,
      description,
      images,
      category,
    });
    res.json(newProduct);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.find();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const products = await Products.find();
    const oldimg = req.params.oldimg
    const newimg = req.params.newimg
    await Products.updateOne(
      {
        images: oldimg
      },
      {
        images: newimg
      }
    );
    res.json(products);
  } catch (err) {
    return res.status(500).json({ msg: err.message });  
  }
};
export const getProductsByAny = async (req, res) => {
  try {
    const any = req.params.any;
    const products = await Products.find();
    const newProducts = products.filter(
      (product) => product.product_id === any || product.category === any || product.title.includes(any)
    );
    console.log(newProducts);
    return res.json(newProducts);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};





