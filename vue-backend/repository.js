const db = require('mongodb');
const MongoClient = db.MongoClient;

const mongoService = {
   pool: null,
   data: [],

   queryAll: function() {
      return this.data;
   },

   updateLocal: function() {
      const cache = [];

      this.pool.find().forEach( doc => {
         cache.push( doc );
      }, () => {
         this.data = cache;
         console.log( this.queryAll() );
      });
   },

   openConnection: function( url, callback ) {   

      MongoClient.connect( url, ( err, db ) => {

         if ( err ) {
            console.log("cannot connect to mongoDB @ " + url);
            throw err;
         } else {
            console.log("connected to mongoDB @ " + url);

            this.pool = db.collection('prize-storage');

            const prizes = this.pool.find();

            prizes.forEach( doc => {
               this.data.push( doc );
            }, () => {
               // console.log( this.data ); 
               callback();                            
            });
         }
      })
   },
   updateQuantity: function( _id, callback ) {

      const o_id = new db.ObjectID( _id );
      const query = { "_id": o_id };

      this.pool.find( query, { } )
      .forEach( item => {
         if( item.quantity > 0 ) {
            try {
               this.pool.updateOne( query, { $inc: { "quantity": -1 } } );         
            }
            catch( e ) {
               console.log( e );
            }
            return callback(`You have redeemed your prize!`);
         } else {
            return callback(`${ item.name } is no longer available.`); 
         }
      });
   }
}
module.exports = mongoService;