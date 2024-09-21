import {
  insertCategory,
  getAllCategory,
  updateCategoryModel,
  deleteAllCategoryModel,
  deleteCategoryModel,
} from "../models/categoryModel.js";

export const addCategory = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  const { name } = req.body;
  console.log("Im in add category controller.", name);
  try {
    await insertCategory(name);
    res.status(201).send({ message: "Category added successfully" });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error in adding category", error: err || err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const result = await getAllCategory();
    res.status(201).send(result);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error in getting all categories", error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  console.log(req.body);
  const { id, name } = req.body;
  console.log("In update category controller", id, name);
  try {
    await updateCategoryModel(id, name);
    res.status(201).send({ message: "Category updated successfully" });
  } catch (err) {
    res.status(400).send({
      message: "Error in updating category",
      error: err || err.message,
    });
  }
};

export const deleteAllCategory = async (req, res) => {
  try {
    await deleteAllCategoryModel();
    res.status(200).json({ message: "All categories deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Error while deleting all category" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await deleteCategoryModel(id);
    res.status(200).json({ message: "Category deleted Successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json({
        message: "Error while deleting category",
        error: err.message || err,
      });
  }
};
