import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ message: "Bạn chưa xác thực" });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

export const authorize = async (req, res, next) => {
    try {
      auth(req, res, () => {
        // Kiểm tra nếu người dùng đã được xác thực
        if (!req.user) {
          return res.status(401).json({ message: 'Bạn chưa xác thực' });
        }
        // Kiểm tra quyền của người dùng
        if (req.user.id === req.params.id || req.user.role === 'user') {
          next();
        } else {
          return res.status(403).json({ message: 'Bạn không có quyền làm việc này' });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
  };
