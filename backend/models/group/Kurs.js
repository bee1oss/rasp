import mongoose from "mongoose";

const Kurs = mongoose.Schema({
    course:{
        type:Number,
        required:true
    }
});

export default mongoose.model('Kurses',Kurs);