import KafkaService from './service/KafkaService';
import PacketCaptureService from './service/PacketCaptureService';

const kafkaService = new KafkaService('packet-capture', ['localhost:9092']);
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
