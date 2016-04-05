import mongoose, { Schema } from 'mongoose';


const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  companies: [{
    type: Schema.Types.ObjectId,
    ref: 'Company',
  }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
