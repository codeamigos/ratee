import mongoose, { Schema } from 'mongoose';


const CustomerSchema = Schema({
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);
