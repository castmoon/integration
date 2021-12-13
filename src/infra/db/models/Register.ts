import mongoose, { Schema } from 'mongoose';

export const RegisterSchema = new Schema(
  {
    user_id: Number,
    owner_name: String,
    value: Number,
    currency: String,
    deal_date: Date,
  },
  {
    collection: 'registers',
  }
);

export const Register = mongoose.model('Register', RegisterSchema);
