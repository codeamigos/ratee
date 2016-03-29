import mongoose, { Schema } from 'mongoose';


const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
