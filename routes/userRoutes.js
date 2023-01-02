const { registerUser, authUser } = require("../controllers/userController");

const router = require("express").Router();


router.post("/register", registerUser)
router.post("/login",authUser)

module.exports = router;