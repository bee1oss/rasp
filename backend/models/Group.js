import mongoose from "mongoose";

const Group = mongoose.Schema({
    group_number:{
        type:Integer,
        required:true
    },
    kurs_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Kurses',
        required: true
        },
});

export default mongoose.model('Groups',Group);