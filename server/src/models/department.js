import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  description: String,
});

const Department = mongoose.model('Department', departmentSchema);
export { Department };