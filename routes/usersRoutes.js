const router = require("express").Router();
const { check } = require("express-validator");
const uploadFile = require("../middleware/file-upload");

const usersController = require("../controllers/users-controller");

router.get("/", usersController.getAllUsers);

router.post(
  "/signup",
  uploadFile.single("image"),
  [
    (check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }))
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
