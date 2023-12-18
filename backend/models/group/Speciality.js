import mongoose from "mongoose";

const Speciality = mongoose.Schema({
    speciality:{
        type:String,
        required:true
    }
});

export default mongoose.model('Specialities',Speciality);