const db = require('mongodb');
const MongoClient = db.MongoClient;

const mongoService = {
   data: [],

   getDataRepo: function( url ) {
      return this.data;
   },

   openConnection: function( url, callback ) {   

      MongoClient.connect( url, ( err, db ) => {

         if ( err ) {
            console.log("cannot connect to mongoDB @ " + url);
            throw err;
         } else {
            console.log("connected to mongoDB @ " + url);

            const prizes = db.collection('prize-storage').find();

            prizes.forEach( doc => {
               this.data.push( doc.data );
            }, () => {
               this.data = this.data[0];
               // console.log( this.data );          
               db.close();       
            });

            callback();
         }
      })
   }
}
module.exports = mongoService;