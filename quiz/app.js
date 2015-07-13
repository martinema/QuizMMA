//Importar paquetes con middlewares.

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Importar enrutadores
var routes = require('./routes/index');
//var users = require('./routes/users');

//Crear aplicación
var app = express(); 

//Configuración motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//instalar middlewares
//Descomentar después de colocar el favicon en /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//instalar enrutadores. Asociar rutas a sus gestores
app.use('/', routes);
//app.use('/users/,users);

//resto de rutas. Genera error 404 de HTTP
app.use(function(req, res, next){
	var err = new Error('Not  Found');
	err.status=404;
	next(err);
}

//gestión de errores durante el desarrollo
if(app.get('env') === 'development'){
	app.use(function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message, 
			error: err; //Muestra err
		});
	});
}

//gestión de errores en producción
app.use(function (err, req, res, next) {
	res.status(err.status || 500){
	res.render('error', {
		message: err.message,
		error:{}
	});
});

//exportar app para comando de arranque
module.exports = app;
