import mongoose from 'mongoose';

const UserShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: "user"
  },
}, { timestamps: true , collection: 'User'});//chèn các collection vào bảng user1
// createdAt, updatedAt sẽ được tự động thêm vào bởi tùy chọn timestamps

export const User = mongoose.model('User100', UserShema);