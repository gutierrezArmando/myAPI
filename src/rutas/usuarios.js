const express = require('express');
const conection = require('../../database/dbConfDespacho');
const app = express.Router();


/*Para desplegar todos los usuarios*/
app.get('/', function (req, res) {
    conection.query('select * from usuarios', function (error, result, fields) {
        if(error)
            throw error;
        return res.json({error: false, data: result, message: 'Lista de usuarios'});
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});


/*Para desplegar el usuario indicado*/
app.get('/:username', function (req, res) {
    var username = req.params.username;
    conection.query('select * from usuarios where nombreUsuario = ?',[username], function (error, result, fields) {
        if(error)
            throw error;
        return res.json({error: false, data: result, message: 'Lista de usuarios'});
        res.status(404);
        res.send("Error al buscar en base de datos");
    })
});

/*Para insertar un nuevo usuario*/
app.get('/add/:nombre/:apellido', function (req, res) {
    //var operacion = req.body;
    var nombre = req.params.nombre;
    var apellido = req.params.apellido;
    console.log(nombre);
    console.log(apellido);
    strQuery = "call agregarUsuario(?,?)";
    //strQuery = "select * from usuarios where nombreUsuario = ? and apellido = ?";
    /* var strQuery =
        "insert into " +
        "operacion(sucursal_id,cajero_id,tipo,folio,fecha,fecha_completada,tc,dolares,pesos, recibido,cambio) " +
        "values(?,?,?,?,current_timestamp(),current_timestamp(), ?, ?, ?, ?, ?)"; */
    if(!nombre) {
        return res.status(400).send({error: true, message: 'Por favor ingrese un usuario'});
    }
    var query = conection.query(strQuery,[nombre, apellido], function (error, results, fields) {
        if(error)
            throw error;
        return res.send({error: false, data: results, message: 'Usuario agregado exitosamente'});
        res.status(404);
        res.send("Id no encontrado");
    });

});

/**Deberia ser put, por alguna razon, no lo ejecuta con put */

app.get('/update/:username/:newPass', function (req, res) {
    //var tarea = req.body;
    var username = req.params.username;
    var contras = req.params.newPass;

    if(!username) {
        res.status(409);
        res.send("No exite valor a modificar");
    }
    conection.query("UPDATE usuarios SET contrasenia = ? WHERE nombreUsuario = ?", [contras, username], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Usuario actualizado exitosamente!! (estructura correcta)' });
        res.status(404);
        res.send("Id no encontrado");
    });

});

module.exports = app;