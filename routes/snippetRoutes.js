import express from "express";
import { addSnippet,getAllSnippets,getSnippetById,updateSnippet,deleteSnippet } from "../controllers/snippetController.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/add", protect, addSnippet);
router.get("/all", protect, getAllSnippets);
router.get("/:id", protect, getSnippetById);
router.put("/update/:id", protect, updateSnippet);
router.delete("/delete/:id", protect, deleteSnippet);



export default router;
