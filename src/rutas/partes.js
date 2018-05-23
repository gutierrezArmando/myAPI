const express = require('express');
const conection = require('../../database/dbConfDespacho');
const app = express.Router();

/*Para desplegar todos los usuarios*/
app.get('/', function (req, res) {
    conection.query('select * from partes', function (error, result, fields) {
        if(error)
            throw error;
        return res.json(result);
        //return res.json({error: false, data: result, message: 'Lista de usuarios'});
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});

/*Para insertar nueva parte*/
app.get('/add', function (req, res) {
    //var operacion = req.body;
    var datos = req.query;
    console.log(datos);
    strQuery = "CALL agregarParte(?,?);";
//    if(!nombre) {
  //      return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
    //}
    var query = conection.query(strQuery,[
        datos.nombre,
        datos.apellido
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