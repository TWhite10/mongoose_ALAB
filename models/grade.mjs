import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const gradeSchema = new mongoose.Schema({

    learner_id: {
        type: Number,
        required: true,
        min:1
      },
      class_id: {
        type: Number,
        required: true,
        min:1
      },
      scores: [
        {
          type: { 
            type: String ,
            required: true,

          },

          score:{ 
            type: Number,
            required: true,
          },
        },
      ]
    
});

gradeSchema.index({ learner_id: 1 });
gradeSchema.index({ class_id: 1 });

export default mongoose.model("Grade", gradeSchema);