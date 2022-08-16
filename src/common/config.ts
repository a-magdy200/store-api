import dotenv from 'dotenv';
dotenv.config();
const config = {
  database: {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
  },
  saltRounds: 10,
  secret: process.env.APP_SECRET
}
export default config
