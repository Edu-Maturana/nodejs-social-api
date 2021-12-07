const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole } = require("../middlewares");

const {
  isValidRole,
  emailExists,
  userExists,
} = require("../helpers/db-validators");

const {
  readUsers,
  readUser,
  createUser,
  updateUser,
} = require("../controllers/user");

const { changeAvatar } = require("../controllers/uploads");

const router = Router();

// GET Requests
router.get("/", readUsers);
router.get("/:id", readUser);

// POST Requests
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
    validateFields,
  ],
  createUser
);

// PUT Requests
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Id not valid").isMongoId(),
    check("id").custom(userExists),
    check("role").custom(isValidRole),
    validateFields,
  ],
  updateUser
);

router.put(
  "/:id/avatar",
  [
    validateJWT,
    check("id", "Id not valid").isMongoId(),
    check("id").custom(userExists),
  ],
  changeAvatar
);

module.exports = router;
