const express = require("express")
const { productCreate, productGet } = require("../controller/productController")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/createProduct",auth,productCreate)
router.get("/getproduct",auth,productGet)

module.exports = router;