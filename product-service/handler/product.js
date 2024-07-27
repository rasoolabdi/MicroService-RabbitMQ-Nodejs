const { isAuthenticated } = require("../../isAuthenticated");
const { pushToQueue, returnChannel, createQueue } = require("../config/rabbitmq");
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


productRouter.post("/buy" , isAuthenticated , async (req,res,next) => {
    try {
        const {productID = []} = req.body;
        const products = await productModel.find({_id : {$in: productID}});
        const {email} = req.user;
        await pushToQueue("ORDER" , {products, userEmail: email});
        const channel = await createQueue("PRODUCT");
        channel.consume("PRODUCT" , (msg) => {
            console.log(JSON.parse(msg.content.toString()));
        });
        return res.json({
            message: "your order created"
        })

        
    }
    catch(error) {
        next(error);
    }
})
module.exports = {
    productRouter
}