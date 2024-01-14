import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          // Check if the phone number contains only 10 numeric digits
          return /^\d{10}$/.test(v);
        },
        message: 'Phone number must be 10 numeric digits',
      },
    },
    address: {
      type: {},
      required: true,
    },
    
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
