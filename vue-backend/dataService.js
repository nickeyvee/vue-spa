const repo = require('./repository');
const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
   
  repo.updateLocal().then( data => {
     console.log( data );
      res.setHeader('Content-Type', 'application/json');
      res.send( JSON.stringify({ data: data }));
      res.end();
  });
});

router.put( '/decrement/:id', ( req, res ) => {
   const callback = function( code, msg ) {
      repo.updateLocal();
      // res.status( code );
      res.send( msg );
   }
   repo.updateQuantity( req.params.id, callback );
})

module.exports = router;