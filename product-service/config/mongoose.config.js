const { default: mongoose } = require("mongoose");


mongoose.connect("mongodb://localhost:27017/MicroRabbit-Product").then(() => {
    console.log("connected to product service")
}).catch(() => {
    console.log("connected to product service Failed")
})