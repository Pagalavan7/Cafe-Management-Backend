import { Router } from "express";
import {
  addCategory,
  deleteAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
const router = Router();

router.post("/add-category", addCategory);
router.get("/get-all-category", getCategory);
router.patch("/update-category", updateCategory);
router.delete("/delete-all-category", deleteAllCategory);
router.delete("/delete-category/:id", deleteCategory);
export default router;
