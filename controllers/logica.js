import { GoogleGenAI } from "@google/genai"
import "dotenv/config"
import Historial from "../models/model.js";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

let historial = [];
const ia1 = async (req, res) => {
 

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: historial,
    config: {
      systemInstruction: process.env.prompt1
    }
  });

  const response = await chat.sendMessage({
    message: "hola"
  });

  let respuesta = response.text;

  res.json({ "respuesta": respuesta, "historial": historial })

};


const ia2 = async (req, res) => {
 

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: historial,
    config: {
      systemInstruction: process.env.prompt2
    }
  });

  const response = await chat.sendMessage({
    message: "hola"
  });

  let respuesta = response.text;

  res.json({ "respuesta": respuesta, "historial": historial })

};

const agregarabdd = async (req, res) => {
    try {
        const { texto, rol } = req.body;
        const nuevoHistorial = new Historial({ rol, texto });
        await nuevoHistorial.save();
        res.status(201).json({ message: "Historial guardado" });
    }catch (error) {
        console.error("Error al guardar el historial:", error);
        res.status(500).json({ message: "Error al guardar el historial" });
    }
}

const limpiarHistorial = async(req, res) => {
    try {
        historial = [];
        await Historial.deleteMany({});
        res.status(200).json({ message: "Historial limpiado" });
    }
    catch (error) {
        console.error("Error al limpiar el historial:", error);
        res.status(500).json({ message: "Error al limpiar el historial" });
}}

const traerinfo = async (req, res) => {
    try {
        const data = await Historial.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el historial:", error);
        res.status(500).json({ message: "Error al obtener el historial" });
    }
}

export {ia1, ia2, agregarabdd, limpiarHistorial, traerinfo}

