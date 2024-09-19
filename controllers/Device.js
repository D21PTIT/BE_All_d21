import { Device } from "../model/device.js";

export const createDevice = async (req, res) => {
    try {
        const { tag, name, status } = req.body;
        const newDevice = new Device({ tag, name, status });
        await newDevice.save();
        return res.status(200).json({ message: 'Device created successfully', device: newDevice });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create device', error: error.message });
    }
};

export const getAllDevice = async (req, res) => {
    try {
        const ans = await Device.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: 'Succesfull', device: ans });
    } catch (error) {
        return res.status(500).json({ message: 'Fail to get all device', error: error.message });
    }
};

export const get10 = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Trang hiện tại
        //tinh so ban ghi can bo qua
        const skip = (page - 1) * 10;
        //tinh tong so ban ghi hien tai
        const total = await Device.countDocuments();
        const device = await Device.find()
                                .skip(skip)
                                .limit(10);

        return res.status(200).json({
            totalPages: Math.ceil(total / 10),  // Tổng số trang
            currentPage: page,  // Trang hiện tại
            device  // Dữ liệu người dùng
        });
    } catch (error) {
        return res.status(500).json({ message: 'Fail to get all device', error: error.message });
    }
};


export const getDeviceBySearch = async (req, res) => {
    try {
        // Lấy giá trị tmp từ query string
        const { tmp } = req.query;
        console.log(tmp);
        // Sử dụng tmp để tìm kiếm trong cơ sở dữ liệu
        const ans = await Device.find({ tag: tmp }).sort({ createdAt: -1 });

        return res.status(200).json({ message: 'Succesfull', device: ans });
    } catch (error) {
        return res.status(500).json({ message: 'Fail to get device by search', error: error.message });
    }
};












