import mongoose from "mongoose";

const Group = mongoose.Schema({
    group_number:{
        type:String,
        required:true
    },
    kurs: { 
        type:String,
        required:true
        },
    speciality: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Specialities',
        required: true
        }
});

export default mongoose.model('Groups',Group);