import mongoose from 'mongoose';

const deviceShema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    default: "off"
  },
}, { timestamps: true , collection: 'Device'});//chèn các collection vào bảng user1
// createdAt, updatedAt sẽ được tự động thêm vào bởi tùy chọn timestamps

export const Device = mongoose.model('Device', deviceShema);