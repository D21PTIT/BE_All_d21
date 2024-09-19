import mqtt from 'mqtt';

// Kết nối tới MQTT broker tại localhost với chứng thực username và password
const mqttClient = mqtt.connect({
  host: 'localhost',
  port: 2003,
  username: 'kien',
  password: '123456',
});


export default mqttClient;
