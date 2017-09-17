const express = require('express');
const port = process.env.PORT || 3000;
const prod = process.env.PROD; // <=== boolean
const dir = prod ? __dirname : "C:/Users/nvorr/Desktop/vue-spa/vue-frontend";
const repo = require('./repository');
const dataService = require('./dataService');
const path = require('path');
const app = express();


const dist = path.join( dir , "dist");

const mongoUrl = process.env.MONGODB_URI;

app.use( express.static( dist ));
app.use( '/api', dataService );


app.get( '*', ( req, res ) => {
   res.sendFile( path.join( dist, 'index.html' ));
})

const serverStart = () => app.listen( port, () => {
   console.log( "app listening on port", port );
});

repo.openConnection( mongoUrl, serverStart );