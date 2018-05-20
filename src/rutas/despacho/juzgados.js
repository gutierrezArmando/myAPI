const express = require('express');
const conection = require('../../../database/dbConfDespacho');
const app = express.Router();

/*Para desplegar todos las materias civiles*/
app.get('/materias', function (req, res) {
    conection.query('select * from materias', function (error, result, fields) {
        if(error)
            throw error;
        //return res.json({error: false, data: result, message: 'Lista de materias'});
        return res.json(result);
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});

/*Para desplegar todos las partidos*/
app.get('/partidos', function (req, res) {
    conection.query('select * from partidosjudiciales', function (error, result, fields) {
        if(error)
            throw error;
        //return res.json({error: false, data: result, message: 'Lista de materias'});
        return res.json(result);
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});

module.exports = app;