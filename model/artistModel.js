import mongoose from 'mongoose';

const artistShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  birth: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
  },
  songs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }]

}, { timestamps: true , collection: 'Artist'});//chèn các collection vào bảng user1
// createdAt, updatedAt sẽ được tự động thêm vào bởi tùy chọn timestamps

export const Artist = mongoose.model('User1', artistShema);