import KafkaService from './service/KafkaService';
import PacketCaptureService from './service/PacketCaptureService';

const kafkaBrokers = ['kafka-1:19092'];
const kafkaService = new KafkaService('packet-capture', kafkaBrokers);
const packetCaptureService = new PacketCaptureService('en0', kafkaService);

const startServices = async () => {
    try {
        await kafkaService.connect();
        packetCaptureService.startCapture();
    } catch (error) {
        console.error('Error starting services:', error);
    }
};

startServices();
