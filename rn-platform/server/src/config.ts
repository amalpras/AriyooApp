import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 3333),
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  uploadDir: process.env.UPLOAD_DIR || './uploads'
};