import mqttClient from "../config/mqttConfig.js";
import { Message } from "../model/TestIOT.js";

export const addTest = async (req, res) => {
    try {
        const { topic, message } = req.body;
        const newTest = new Message({ topic, message});
        await newTest.save();
        return res.status(200).json({ message: 'Device created successfully', test: newTest });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create device', error: error.message });
    }
};

export const getAllTest = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json({
          status: 'success',
          data: messages
        });
      } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
      }
};

export const saveMessage = async (topic, message) => {
    try {
      const newMessage = new Message({
        topic,
        message,
      });
      await newMessage.save();
      console.log('Message saved to MongoDB');
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  export const sendMqtt = async (req, res) => {
    const { topic, message } = req.body;
    if (!topic || !message) {
        return res.status(400).json({ message: 'Topic and message are required' });
    }

    // Publish tin nhắn tới topic
    mqttClient.publish(topic, message, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to publish message', error: err });
        }
        res.status(200).json({ message: `Message sent to topic ${topic}` });
    });
  };

