import mongoose from "mongoose";

const Kurs = mongoose.Schema({
    courses:{
        type:Integer,
        required:true
    }
});

export default mongoose.model('Kurses',Kurs);