import * as pcap from 'pcap';

const pcapSession: any = pcap.createSession('en0', {filter: 'tcp'});

console.log("Listening on " + pcapSession.device_name);

pcapSession.on('packet', (rawPacket: any) => {
    const packet = pcap.decode.packet(rawPacket);
    console.log("패킷 캡처됨: ", packet);
});
