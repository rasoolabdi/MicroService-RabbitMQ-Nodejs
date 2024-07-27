const { default: mongoose, mongo } = require("mongoose");


const orderSchema = new mongoose.Schema({
    products: [
        {
            _id: {type: mongoose.Types.ObjectId}
        }
    ],
    userEmail: {type: String , ref: "auth"},
    tottalPrice: {type: Number}
} , {timestamps: true});

const orderModel = mongoose.model("order" , orderSchema);
module.exports = orderModel;