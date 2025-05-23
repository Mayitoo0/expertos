import express from 'express';
import router from './routers/rutas.js';
import mongoose from 'mongoose';
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use('/', router);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la BD'));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${4501}/index.html`);
});