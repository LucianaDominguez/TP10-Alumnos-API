import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import config from './configs/config.js'
import pkg from 'pg'


const { Client }  = pkg;
const app  = express();
const port = 3000;
let alumnosArray = [];


app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

app.get('/api/alumnos/', async (req, res) => {
    const client = new Client(config)
    console.log("entre e alumnos")
    try{
        await client.connect()
        let sql =  `SELECT * FROM Alumnos`
        let alumnos = await client.query(sql);
        alumnosArray = alumnos;
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
        let result = await client.query(sql, values);    

        res.status(200).send(result.rows[0]);
    }
    catch(error){
        if(isNaN(id)){
            res.status(400).send("ID inválido");
        }
        else if (!alumnosArray.contains(id)){
            res.status(404).send("Alumno inexsitente");
        }

        console.log(error)
        res.status(500).send(error);
    }

    finally{
        await client.end()
    }

}),

app.post('/api/alumnos/', async (req, res) => {
    const client = new Client(config)
    const { nombre, apellido, id_curso, fecha_nacimiento, hace_deportes } = req.body;
 
    try{
        await client.connect()

        const sql =  'INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes) VALUES ($1, $2, $3, $4, $5)';
        const values = ['Harry', 'Stylesheet', '4', '1994-02-01', '1' ]
        const result = await client.query(sql, values);    

        console.log("entro a try")
        if(todoCool){
            res.status(201);
        }

        else if(nombre == null || apellido == null || id_curso == null || fecha_nacimiento == null || hace_deportes == null){
            res.status(400).send("Información vacía");
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

app.put('/api/alumnos/', async (req, res) => {
    const client = new Client(config)
    const { id, nombre, apellido, id_curso, fecha_nacimiento, hace_deportes } = req.body;
 
    try{
        await client.connect()

        const sql = `UPDATE alumnos SET nombre = $2, apellido = $3, id_curso = $4, fecha_nacimiento = $5, hace_deportes = $6 WHERE id = $1`;
        const values = [id, nombre, apellido, id_curso, fecha_nacimiento, hace_deportes]
        const result = await client.query(sql, values);    

        console.log("entro a try")
        if(result.rowCount > 0){
            res.status(201).send("Actualización exitosa!");
        }

        else if(id == null | nombre == null || apellido == null || id_curso == null || fecha_nacimiento == null || hace_deportes == null){
            res.status(400).send("Información vacía!");
        }
        
        else if (result.rowCount < 0){
            res.status(404).send("Alumno inexsitente!");

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

app.delete('/api/alumnos/delete/:id', async (req, res) => {
    const client = new Client(config)
    const id = parseInt(req.params.id, 10);
    const values = [id];

    try {
        await client.connect();

        const sql = 'DELETE FROM alumnos WHERE id = $1';
        const result = await client.query(sql, values);


        if (result.rowCount > 0) {
            res.status(200).send("Alumno eliminado");
        }
        
        else {
            res.status(404).send("Alumno inexistente");
        }
    }
    
    catch (error) {
        res.status(500).send(error);
    } 
    
    finally {
        await client.end();
    }
});


//
// Inicio el Server y lo pongo a escuchar.
//

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`)
})