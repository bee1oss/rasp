import mongoose from "mongoose";

const Predmet = mongoose.Schema({
    predmet:{
        type:String,
        required:true
    }
});

export default mongoose.model('Predmets',Predmet);