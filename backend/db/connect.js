import mongoose from "mongoose";

async function connect(){
   const res =  await mongoose.connect('mongodb://127.0.0.1:27017/medLink');
   if(res.connections) {
      console.log('Connected to MongoDB successfully!');
   }
}

export default connect;