import { User } from "../model/User.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from 'jsonwebtoken';
export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, role } = req.body;
    //kiem tra xem nguoi dung co bi trung ten dang nhap hay khong

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    //tao nguoi dung moi nhe
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, password: hashPassword, role });
    await user.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

export const handleLogin = async (req, res)=>{
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Tên người dùng và mật khẩu là bắt buộc' });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không chính xác' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không chính xác' });
    }
    console.log(process.env.JWT_SECRET)
    const payload ={
      'username': user.username,
      'role': user.role
    }
    const access_token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXP }
    )

    //If login is successful
    return res.status(200).json({ message: 'Đăng nhập thành công', code: access_token, user: payload});
  } catch (error) {
    return res.status(500).json({ message: 'Không thể đăng nhập', error: error.message });
  }
}

