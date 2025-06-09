import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import config from './configs/db-config.js'
import pkg from 'pg'


const { Client }  = pkg;
const app  = express();
const port = 3000;

app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

app.get('/api/alumnos/', async (req, res) => {
    },

app.get('/api/alumnos/:id', async (req, res) => {...}
app.post('/api/alumnos/', async (req, res) => {...}
app.put('/api/alumnos/', async (req, res) => {...}
app.delete('/api/alumnos/:id', async (req, res) => {...}


//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})