import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true , collection: 'TestIOT'});//chèn các collection vào bảng user1
// createdAt, updatedAt sẽ được tự động thêm vào bởi tùy chọn timestamps

export const Message = mongoose.model('IOTTT', messageSchema);