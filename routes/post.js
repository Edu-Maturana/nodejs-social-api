const { Router } = require("express");
const { check } = require("express-validator");

const {validateFields, validateJWT} = require("../middlewares");

const {createPost, readPosts} = require("../controllers/post");
const router = Router();

router.get("/", readPosts);

router.post(
    "/",
    [
        check("content", "Content is required").not().isEmpty(),
        validateFields,
        validateJWT
    ],
    createPost
);

module.exports = router;

