const express = require("express");
const app = express();
require("dotenv").config();
const {PORT} = process.env;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req,res,next) => {
    return res.json({error: "NotFound"})
});

app.use((error , req,res, next) => {
    return res.json({error: error.message})
});


app.listen(PORT, () => {
    console.log(`service product is running on port ${PORT} http://localhost:${PORT}`)
});

