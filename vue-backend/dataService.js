const repo = require('./repository');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   console.log( repo.getDataRepo() );

   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify({ data: repo.getDataRepo() }));
   res.end();   
});

module.exports = router;