const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/products')

const ProductSchema = new Schema(
  {
    product_id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    related: [ Number ],
    styles: [ StyleSchema ],
    features: [ featureSchema ]
    thumbnail_urls: [ String ],
    urls: [ String ],
    skus: { [skuSchema] }
  }
)

const StyleSchema = new Schema({
  style_id: Number,
  style_name: String,
  original_price: Number,
  sale_price: Number,
  default_style: Boolean
})

const featureSchema = new Schema({
  {
    feature: String,
    value: String
  }
})

const skuSchema = new Schema({
  sku_id: Number,
  quantity: Number,
  size: String
})

const Product = mongoose.model('Product', ProductSchema);
const Style = mongoose.model('Style', StyleSchema);
const Feature = mongoose.model('Feature', featureSchema);
const Sku = mongoose.model('Sku', skuSchema);