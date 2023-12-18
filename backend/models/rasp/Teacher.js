import mongoose from "mongoose";

const Teacher = mongoose.Schema({
    teacher:{
        type:String,
        required:true
    }
});

export default mongoose.model('Teachers',Teacher);