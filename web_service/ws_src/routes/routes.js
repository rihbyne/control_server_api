/*
 * serveApp.js - Hello World using Express
 */

/* jslint   node  : true , continue : true,
 devel         : true , indent   : 2,    maxerr   : 50,
 newcap        : true , nomen    : true, plusplus : true,
 regexp        : true , sloppy   : true, vars     : false
 */

//-------define module scope variables----------------
'use strict';
var
    gpioController = require('.././api');

//-------end module scope variable declaration--------

//-------begin server configuration-------------------
module.exports = function( app ) {
    app.get( '/',function  (req, res) {
        //a simple http server
        res.setHeader( 'Content-length', gpioController.greet.length );
        res.writeHead(200 ,{ 'Content-type' : 'text/plain' });
        res.end( gpioController.greet );
        if (gpioController.greet.length) {
            //calculate and randamize string
            console.log("length : " + " " + gpioController.greet.length);
            //console.log(process.env.NODE_ENV);
        }
    });

    app.all('/gpio/*?', function(req, res, next) {
       res.contentType( 'json' );
       next();
    });

    app.get('/gpio/pinlist', function(req, res) {
            res.send({
                pinlist: gpioController.pinlist
            });
        console.log("accessed pin list" + " "+ gpioController.pinHolder);
    });

    app.get('/gpio/:pin_no([0-9]+)/:direction/1',
        function(req, res) {
            var
                pin = req.params.pin_no,
                direction = req.params.direction,
                result;

            result = gpioController.triggerPin(pin, direction, 1);
            res.send(result);
            console.log(result);
    });


    app.get('/gpio/:pin_no([0-9]+)/:direction/0',
        function(req, res) {
            var
                pin = req.params.pin_no,
                direction = req.params.direction,
                result;

            result = gpioController.triggerPin(pin, direction, 0);
            res.send(result);
            console.log(result);
        });


};

//-------end server configuration--------------------