// Recursos
// https://arjunphp.com/creating-restful-api-express-js-node-js-mysql/
// https://www.youtube.com/watch?v=pz_4UOHq594&list=PLEw4347lfIFG8mL96p2metxqBa0LsL8MC&index=2
// https://www.youtube.com/watch?v=FBguazxFbVo&index=3&list=PLEw4347lfIFG8mL96p2metxqBa0LsL8MC

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');/*Necesario para la configuracion del view engine*/

const usuariosDespacho = require('./rutas/despacho/usuarios');
const juzgados = require('./rutas/despacho/juzgados');
const expedientes= require('./rutas/despacho/expedientes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*Configuracion de puerto*/
app.set('port', process.env.PORT || 3000);

/*Soporte de request*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    /*Linea agregada para que aceptara el metodo PUT*/
    res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});


/*Para el uso de archivo estaticos, dentro del directorio views*/
app.use(express.static(__dirname + '/views'));

/*setup engine view*/
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/API/despacho/usuarios', usuariosDespacho);
app.use('/API/despacho/juzgados', juzgados);
app.use('/API/despacho/expedientes', expedientes);

/**Para la pagina principal */
app.get('/', function (req, res) {
    res.render('index');
});

/**Para cualquier ruta que no exista en el sitio, despues de validar las rutas anteriores */
app.all('*', function (req, res, next) {
    res.send('<h1>Pagina no encontrada</h1>')
});

app.listen(app.get('port'), function () {
    console.log('Servidor iniciado, http://localhost:'+app.get('port'));
});