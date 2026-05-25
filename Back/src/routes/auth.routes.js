const express = require("express");

const RegisterController = require("../controllers/register.controller");
const LoginController = require("../controllers/login.controller");

const router = express.Router();

router.post("/register", RegisterController.handle);
router.post("/login", LoginController.handle);

module.exports = router;
