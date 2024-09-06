import { Kafka, Producer } from 'kafkajs';

class KafkaService {
    private kafka: Kafka;
    private producer: Producer;

    constructor(clientId: string, brokers: string[]) {
        this.kafka = new Kafka({ clientId, brokers });
        this.producer = this.kafka.producer();
    }

    public async connect(): Promise<void> {
        await this.producer.connect();
    }

    public async produceMessage(topic: string, message: string): Promise<void> {
        await this.producer.send({
            topic,
            messages: [{ value: message }],
        });
        console.log('Message sent:', message);
    }
}

export default KafkaService;
