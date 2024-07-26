const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MicroRabbit-Auth").then(() => {
    console.log("connected To DB AuthService")
}).catch(() => {
    console.log("connected To DB AuthService Falied")
});

