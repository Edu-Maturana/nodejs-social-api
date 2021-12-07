const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");
const {
  readCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

const router = Router();

router.get("/:id", validateJWT, readCommentsByPost); // Here, the id is the id of the post
router.post("/:id", validateJWT, createComment); // Repeat this ^
router.put("/:id", validateJWT, updateComment);
router.delete("/:id", validateJWT, deleteComment);

module.exports = router;
