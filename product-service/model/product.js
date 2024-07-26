const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number}
} , {timestamps: true});

const productModel = mongoose.model("product" , productSchema);
module.exports = productModel;