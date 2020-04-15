/* eslint-disable func-names */
/* eslint-disable radix */
import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { start } from './start';

dotenv.config();

const { SECRET } = process.env;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  hash: String,
  salt: String,
}, { timestamps: true });

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 100, 64, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 100, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      exp: parseInt(expiry.getTime() / 1000)
    },
    SECRET
  );
};

const UserModel = mongoose.model('users', userSchema);

start(UserModel);

export default UserModel;
