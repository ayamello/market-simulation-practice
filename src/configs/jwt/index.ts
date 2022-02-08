import dotenv from "dotenv";

dotenv.config();

const jwtConfig = {
  secret: process.env.SECRET_KEY || "",
  expiresIn: process.env.EXPIRES_TOKEN,
};

export default jwtConfig;
