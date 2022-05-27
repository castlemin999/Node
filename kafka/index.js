const kafka = require("kafka-node");
const { Producer, KafkaClient } = kafka;

const client = new KafkaClient({
    "kafkaHost": "localhost:9092",
    "sasl": {
        "mechanism": "plain",
        "username": "consumer2",
        "password": "consumer-zjstbaj2~",
    }
});

const producer = new Producer(client);
producer.on("ready", ()=>{
    producer.send([
        { topic: "topic-ui5.0-action-json", "messages": ['[{"topic":"topic1","messages":"hi","partition":0},{"topic":"topic2","messages":["hello","world",123]}]', "B", "C"] }
    ], (error, data)=>{
        console.log(data);
    });
});