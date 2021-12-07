const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");

const {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const router = Router();

router.get("/", readPosts);
router.get("/:id", readPost);

router.post(
  "/",
  [
    check("content", "Content is required").not().isEmpty(),
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
