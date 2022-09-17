const express = require("express");
const router = express.Router();
const { getProduct, getStyle, getRelated } = require("./controllers");

router.get("/:product_id", getProduct);
router.get("/:product_id/styles", getStyle);
router.get("/:product_id/related", getRelated);

module.exports = router;
