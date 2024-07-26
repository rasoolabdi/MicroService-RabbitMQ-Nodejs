const { default: mongoose } = require("mongoose");


mongoose.connect("mongodb://localhost:3003/MicroRabbit-Product").then(() => {
    console.log("connected to product service")
}).catch(() => {
    console.log("connected to product service Failed")
})