import mongoose, { Schema } from 'mongoose';


const QuizSchema = Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [{
    kind: {
      type: String,
      required: true,
      enum: ['singular', 'input'],
    },
    title: {
      type: String,
      required: true,
    },
    options: [String],
  }],
}, { timestamps: true });

export default mongoose.model('Quiz', QuizSchema);
