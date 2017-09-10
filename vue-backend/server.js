const express = require('express');
const port = process.env.PORT || 3000;
const data = require('./repository');
const dataService = require('./dataService');
const path = require('path');
const app = express();

const Dist =  path.join( "C:/Users/nvorr/Desktop/vue-spa/vue-frontend", "dist");

const mongoUrl = process.env.MONGODB_URI;

app.use( express.static( Dist ));
app.use( '/data', dataService );

app.get( '*', ( req, res ) => {
   res.sendFile( path.join( Dist, 'index.html' ));
})

const serverStart = () => app.listen( port, () => {
   console.log( "app listening on port", port );
});

data.openConnection( mongoUrl, serverStart );