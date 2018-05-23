const express = require('express');
const conection = require('../../database/dbConfDespacho');
const app = express.Router();

var url = require('url');

/*Para insertar un nuevo expediente*/
app.get('/add', function (req, res) {
    //var operacion = req.body;
    var datos = req.query;
    console.log(datos);
    strQuery = "CALL agregarExpediente(?,?,?,?,?,?,?,?);";
//    if(!nombre) {
  //      return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
    //}
    var query = conection.query(strQuery,[
        datos.numero,
        parseInt(datos.anio),
        datos.tipo,
        datos.clave,
        datos.materia,
        datos.partido,
        datos.juzgado,
        datos.secretaria
    ], function (error, results, fields) {
        if(error)
            throw error;
        //return res.send({error: false, data: results, message: 'Usuario agregado exitosamente'});
        console.log(results[0][0]);
        return res.json(results[0][0]);
        res.status(404);
        res.send("Id no encontrado");
    });

});

module.exports = app;