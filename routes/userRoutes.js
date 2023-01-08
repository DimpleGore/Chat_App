const { registerUser, authUser, allUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = require("express").Router();


router.post("/register", registerUser)
router.post("/login",authUser)
router.get("/search",protect, allUsers)

module.exports = router;