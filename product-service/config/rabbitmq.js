const amqp = require("amqplib");
let channel;
const connectToChannel = async() => {
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        return await connection.createChannel();
    }
    catch(error) {
        console.log("cannot connect to rabbitMQ server");
    }
}

const returnChannel = async() => {
    if(!channel) {
        channel = await connectToChannel();
    }
    return channel;
}

const createQueue = async(queueName) => {
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

module.exports = {
    returnChannel,
    pushToQueue,
    connectToChannel,
    createQueue
}