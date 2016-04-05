import mongoose, { Schema } from 'mongoose';


const CompanySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  logoLink: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Company', CompanySchema);
