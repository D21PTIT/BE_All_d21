import { Data } from "../model/rtData.js";

export const createData = async (req, res) => {
    try {
        const { humidity,light,temperature   } = req.body;
        const newData = new Data ({ humidity,light,temperature });
        await newData.save();
        return res.status(200).json({ message: 'Device created successfully', device: newData });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create device', error: error.message });
    }
};

export const getAllData = async (req, res) => {
    try {
        const ans = await Data.find();
        return res.status(200).json({ message: 'Get all data successfully', data: ans });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get all data', error: error.message });
    }
};

export const get10Data = async (req, res) => {
    try {
        const ans = await Data.find().sort({ createdAt: -1 }).limit(10);
        return res.status(200).json({ message: 'Get 10 data successfully', data: ans });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get data', error: error.message });
    }
};




