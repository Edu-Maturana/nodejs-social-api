const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");

const {
  createPost,
  readPosts,
  readPost,
  readPostsByUser,
  updatePost,
  deletePost,
} = require("../controllers/post");
const router = Router();

router.get("/", readPosts);
router.get("/:id", readPost);
router.get("/user/:id", readPostsByUser);

router.post(
  "/",
  [
    check("text", "Text is required").not().isEmpty(),
    validateFields,
    validateJWT,
  ],
  createPost
);

router.put(
    "/:id",
    [
        check("content", "Content is required").not().isEmpty(),
        validateFields,
        validateJWT,
    ],
    updatePost
);

router.delete("/:id", validateJWT, deletePost);

module.exports = router;
