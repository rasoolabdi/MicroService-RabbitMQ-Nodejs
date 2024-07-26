const express = require("express");
const { orderRouter } = require("./handler/order");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const {PORT} = process.env;
app.use("/order" , orderRouter);


app.use((req,res,next) => {
    return res.json({error: "NotFound"});
});

app.use((error , req ,res , next) => {
    return res.json({error: error.message});
});





app.listen(PORT , () => {
    console.log(`Service Auth runing on port ${PORT} http://localhost:${PORT}`);
})