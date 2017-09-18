const db = require('mongodb');
const MongoClient = db.MongoClient;

const mongoService = {
   pool: null,
   data: [],

   queryAll: function() {
      return this.data;
   },

   updateLocal: function( callback ) {
      return new Promise((resolve, reject) => {

         this.pool.find().toArray((err, data) => {
            if (err) {
               console.log(err);
               reject(err);
            } else {
               console.log('done!');
               resolve( data );                        
            }
         })
      })
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
            return callback( 202, `You have redeemed your prize!`);
         } else {
            return callback( 406, `${ item.name } is no longer available.`); 
         }
      });
   }
}
module.exports = mongoService;