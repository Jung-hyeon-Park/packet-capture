import * as pcap from 'pcap';
import KafkaService from './KafkaService';

class PacketCaptureService {
    private pcapSession: any;
    private kafkaService: KafkaService;

    constructor(interfaceName: string, kafkaService: KafkaService) {
        this.pcapSession = pcap.createSession(interfaceName, { filter: 'tcp' });
        this.kafkaService = kafkaService;
        console.log("Listening on " + this.pcapSession.device_name);
    }


    public startCapture(): void {
        this.pcapSession.on('packet', async (rawPacket: any) => {
            const packet = pcap.decode.packet(rawPacket);
            console.log("패킷 캡처됨: ", packet);

            try {
                const packetData = JSON.stringify(packet);
                await this.kafkaService.produceMessage('packet-topic', packetData);
            } catch (error) {
                console.error('Error sending packet to Kafka:', error);
            }
        });
    }
}

export default PacketCaptureService;
