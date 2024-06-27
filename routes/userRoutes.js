const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", userController.createUser);
router.get("/", authMiddleware, userController.getUser);
router.patch("/",authMiddleware, userController.updateUser);
router.delete('/', authMiddleware, userController.deleteUser)


module.exports = router