const mqtt = require('mqtt');
const { Message } = require('../model/TestIOT');
//const Message = require('../models/messageModel');

// Kết nối tới MQTT broker
const brokerUrl = 'mqtt://test.mosquitto.org'; // Thay đổi nếu cần
const client = mqtt.connect(brokerUrl);

// Khi kết nối thành công
client.on('connect', function () {
  console.log('Đã kết nối đến MQTT broker!');
  // Đăng ký vào topic mà bạn muốn
  client.subscribe('kien', function (err) {
    if (!err) {
      console.log('Đã subscribe topic: kien');
    }
  });
});

// Khi nhận được message từ MQTT topic
client.on('message', async function (topic, message) {
  const msg = message.toString();
  console.log(`Nhận được message từ topic ${topic}: ${msg}`);

  // Giả sử message có định dạng "username: kien"
  const [username, userMessage] = msg.split(':').map(part => part.trim());

  if (username && userMessage) {
    // Lưu message vào MongoDB
    const newMessage = new Message({ username, message: userMessage });
    await newMessage.save();
    console.log('Đã lưu message vào MongoDB:', newMessage);
  } else {
    console.log('Message không hợp lệ:', msg);
  }
});
