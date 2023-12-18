import mongoose from "mongoose";

const RaspSchema = mongoose.Schema({
    time: { type: mongoose.Schema.Types.ObjectId,ref: 'Times',required: true},
    day:{type: mongoose.Schema.Types.ObjectId,ref: 'Days',required: true},
    predmet:{type: mongoose.Schema.Types.ObjectId,ref: 'Predmets',required: true},
    teacher:{type: mongoose.Schema.Types.ObjectId,ref: 'Teachers',required: true},
    room:{type: String,required: true},
    group:{type: mongoose.Schema.Types.ObjectId,ref: 'Groups',required: true},
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'Users'},
});

export default mongoose.model('Rasps', RaspSchema);