import mongoose from "mongoose";

const Time = mongoose.Schema({
    time:{
        type:String,
        required:true
    }
});

export default mongoose.model('Times',Time);