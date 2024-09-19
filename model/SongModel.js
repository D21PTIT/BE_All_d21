import mongoose from 'mongoose';


const songShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  },
  release: {
    type: String,
  }
}, { timestamps: true , collection: 'Song'});//chèn các collection vào bảng user1
// createdAt, updatedAt sẽ được tự động thêm vào bởi tùy chọn timestamps

export const Song = mongoose.model('User2', songShema);