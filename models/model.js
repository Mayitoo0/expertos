import mongoose from "mongoose";

const historialSchema = new mongoose.Schema({
    rol:{
        type: String
    }
    ,
    texto:{
        type: String
    }
});

export default mongoose.model("Historial", historialSchema);