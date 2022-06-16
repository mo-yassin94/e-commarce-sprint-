import Categories from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const addCategory = async (req, res) => {
  try {
    const { name,imagepath } = req.body;
    const oldcategory = await Categories.findOne({ name });
    if (oldcategory)
      return res.status(400).json({ msg: 'category already exists!' });
    const category = await Categories.create({ name,imagepath });
    res.json(category);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    await Categories.findByIdAndDelete(id);

    res.json({ msg: 'category is deleted' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
