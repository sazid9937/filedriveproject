import mongoose, { Schema } from "mongoose";


const fileSchema = new Schema({

    title: { type: String, required: false },
    filename: { type: String, required: false },
    path: { type: String, required: false },
    size: { type: Number, required: false },
    mimetype: { type: String, required: false },
    uploadedAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
    isFavorite: {
        type: Boolean, required: false, default: false
    },
    isTrash:{
        type: Boolean,required:false,default:false
    },
    trashedAt: { type: Date },
})

fileSchema.index({ trashedAt: 1 }, { expireAfterSeconds: 5 * 60 });
const File = mongoose.model('File', fileSchema);

export default File;
