const { default: mongoose } = require("mongoose");


mongoose.connect("mongodb://localhost:27017/MicroRabbit-Order").then(() => {
    console.log("connected to Order Service")
}).catch(() => {
    console.log("connected to Order Service Failed");
})