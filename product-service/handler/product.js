const productModel = require("../model/product");
const productRouter = require("express").Router();

productRouter.post("/create" ,async (req,res,next) => {
    try {
        const {name , description , price} = req.body;
        const newProduct = new productModel({name , description , price});
        await newProduct.save();
        return res.json({message: "create newProduct successfully" , product: newProduct})

    }
    catch(error) {
        next(error);
    }
})


productRouter.post("/buy" , async (req,res,next) => {
    try {
        const {productID = []} = req.body;
        const products = await productModel.find({_id : {$in: productID}});
    }
    catch(error) {
        next(error);
    }
})
module.exports = {
    productRouter
}