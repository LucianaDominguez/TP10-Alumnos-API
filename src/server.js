import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import config from './configs/config.js'
import pkg from 'pg'


const { Client }  = pkg;
const app  = express();
const port = 3000;
const alumnosArray = [];


app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

app.get('/api/alumnos/', async (req, res) => {
    const client = new Client(config)
    console.log("entre e alumnos")
    try{
        await client.connect()
        let sql =  `SELECT * FROM Alumnos`
        let alumnos = await client.query(sql);
        res.status(200).send(alumnos.rows);

    }

    catch(error){
        res.status(500).send(error);
        console.log(error)
    }

    finally{
        await client.end()
    }

});

app.get('/api/alumnos/:id', async (req, res) => {
    const client = new Client(config)
    const id = req.params.id

    try{
        await client.connect()

        const sql =  'SELECT * FROM Alumnos WHERE id = $1'
        const values = [id]
        const result = await client.query(sql, values);    


        if(!isNaN(id)){
            res.status(200).send(result.rows[0]);
        }

        else if(isNaN(id)){
            res.status(400).send("ID inválido");
        }
        
        else if (id == -1){
            res.status(404).send("Alumno inexsitente");

        }
    }

    catch(error){
        console.log(error)
        res.status(500).send(error);
    }

    finally{
        await client.end()
    }

}),

app.post('/api/alumnos/', async (req, res) => {
    alumnosArray.push(new Alumno(req.body));
    res.json(alumnosArray);

}),

// app.put('/api/alumnos/', async (req, res) => {

// }),

app.delete('/api/alumnos/:id', async (req, res) => {

}),


//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`)
})