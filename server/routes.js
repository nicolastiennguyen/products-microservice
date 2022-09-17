const express = require("express");
const router = express.Router();
const { getProducts, getProduct, getStyle, getRelated } = require("./controllers");

router.get("/", getProducts);
router.get("/:product_id", getProduct);
router.get("/:product_id/styles", getStyle);
router.get("/:product_id/related", getRelated);

module.exports = router;
