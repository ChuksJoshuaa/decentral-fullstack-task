import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

export const hashedPassword = (password) => {
  const hashed =  bcrypt.hash(password, 12);
  return hashed;
};

export const comparePassword = (password, userPassword) => {
  const doesthePasswordMatch = bcrypt.compare(password, userPassword);
  return doesthePasswordMatch;
};


export const getUserByEmail = (data, email) => {
  return data.findOne({ email });
};

export const getToken = (result) => {
   return jwt.sign(
     { email: result.email, id: result._id },
     process.env.JWT_SECRET,
     { expiresIn: process.env.JWT_LIFETIME }
   );
}
