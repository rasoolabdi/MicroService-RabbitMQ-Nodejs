const amqp = require("amqplib");
const orderModel = require("../model/order");
let channel;

const connectTochannel = async() => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        return  channel;
    } catch (error) {
        console.log(("cannot connect to rabbitmq server"));
    }
}


const returnChannel = async() => {
    if(!channel) {
        channel = await connectTochannel();
    }
    return channel;
}

const createQueue = async(queueName) => {
    console.log("queueName =>" , queueName);
    const channel = await returnChannel();
    await channel.assertQueue(queueName);
    return channel;
}

const pushToQueue = async(queueName , data) => {
    try {
        await returnChannel();
        await channel.assertQueue(queueName);
        return channel.sendToQueue(queueName , Buffer.from(JSON.stringify(data)));
    }
    catch(error) {
        console.log(error.message);
    }
}


const createOrderWithQueue = async(queueName) => {
    await createQueue(queueName);
    channel.consume(queueName , async(msg) => {
        if(msg.content) {
            const {products , userEmail} = JSON.parse(msg.content.toString());
            const newOrder = new orderModel({products , userEmail , totalPrice: (products.map(p => +p.price)).reduce((prev , curr) => prev+curr , 0)});
            await newOrder.save();  
            console.log(products);
            console.log(newOrder);
            channel.ack(msg);
            pushToQueue("PRODUCT" , newOrder)
        }
    })
}


module.exports = {
    connectTochannel,
    returnChannel,
    pushToQueue,
    createOrderWithQueue,
    createQueue
}