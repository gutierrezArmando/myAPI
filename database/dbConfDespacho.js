/**Uso de la libreria mysql que se encuentra dentro de node_modules */
const  mysql = require('mysql');

const dbContection = mysql.createConnection({
    //host: 'juridicosoto.sytes.net',
    host: '192.168.1.70',
    user: 'armando',
    password: 'jagn@plexy',
    database: 'despacho'
});

module.exports = dbContection;