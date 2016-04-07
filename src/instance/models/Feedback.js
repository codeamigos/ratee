import mongoose, { Schema } from 'mongoose';


const FeedbackSchema = Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    // required: true,
  },
  answers: [{
    question: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  }],
}, { timestamps: true });

export default mongoose.model('Feedback', FeedbackSchema);
