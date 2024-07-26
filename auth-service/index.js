const express = require("express");
require("./config/mongoose.config");
const { authRouter } = require("./handler/auth");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/auth" , authRouter);


app.use((req,res,next) => {
    return res.json({error: "NotFound"});
});

app.use((error , req ,res , next) => {
    return res.json({error: error.message});
});





app.listen(PORT , () => {
    console.log(`Service Auth runing on port ${PORT} http://localhost:${PORT}`);
})