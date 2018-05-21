
const express = require('express');
const conection = require('../../../database/dbConfDespacho');
const app = express.Router();

var url = require('url');


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

/*Para desplegar el juzgado de acuerdo al partidojudicial y al tipo de materia civil*/
app.get('/juzgado/:materia/:partido', function (req, res) {
    var datos = req.params;
    var consulta = 'select * from vista_juzgados where materia_civil = ? and partido_judicial = ?';
    conection.query(consulta,[datos.materia, datos.partido] ,function (error, result, fields) {
        if(error)
            throw error;
        //return res.json({error: false, data: result, message: 'Lista de materias'});
        return res.json(result);
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});

/*Para obtener la lista de secretarias de acuerdo al juzgado*/
app.get('/secretaria', function (req, res) {
    var datos = req.query;
    var consulta = "select secretarias.id, secretarias.numero " +
    "from secretarias " +
    "RIGHT join vista_juzgados on secretarias.idJuzgado = vista_juzgados.id_juzgado " +
    "where materia_civil = ? and partido_judicial = ? and vista_juzgados.numero=?";
    conection.query(consulta,[datos.materia, datos.partido, datos.juzgado] ,function (error, result, fields) {
        if(error)
            throw error;
        //return res.json({error: false, data: result, message: 'Lista de materias'});
        return res.json(result);
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});



module.exports = app;