import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema({
    riderName: String, // String is shorthand for {type: String}
    passenger: String,
    price: Number,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    picklocation : String,
    droplocation : String
  });
  const Ride = mongoose.model('Ride', rideSchema);
  
export default Ride;
  
