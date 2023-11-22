import mongoose from "mongoose";

const Day = mongoose.Schema({
    day:{
        type:String,
        required:true
    }
});

export default mongoose.model('Days',Day);