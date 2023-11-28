import mongoose from "mongoose";

const Group = mongoose.Schema({
    group_number:{
        type:Integer,
        required:true
    }
});

export default mongoose.model('Groups',Group);