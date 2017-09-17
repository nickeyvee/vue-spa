const repo = require('./repository');
const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
   repo.updateLocal();

   res.setHeader('Content-Type', 'application/json');
   res.send( JSON.stringify({ data: repo.queryAll() }));
   res.end();
});

router.put( '/decrement/:id', ( req, res ) => {
   const callback = function( msg ) {
      repo.updateLocal(); 
      res.send( msg );      
   }
   repo.updateQuantity( req.params.id, callback );
})

module.exports = router;