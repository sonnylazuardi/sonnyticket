var cradle = require('cradle');

ReservationProvider = function() {
  this.connection= new (cradle.Connection)();
  this.db = this.connection.database('reservation');
};

ReservationProvider.prototype.findAll = function(callback) {
    this.db.view('reservation/all',function(error, result) {
      console.log('sonny');
      console.log(result);
      if( error ){
        callback(error)
      }else{
        console.log(result);
        var docs = [];
        result.forEach(function (row){
          docs.push(row);
        });
        callback(null, docs);
      }
    });
};

ReservationProvider.prototype.findById = function(id, callback) {
    this.db.get(id, function(error, result) {
        if( error ) callback(error)
        else callback(null, result)
      });
};

ReservationProvider.prototype.save = function(reservations, callback) {
    var db = this.db;
    if( typeof(reservations.length)=="undefined")
      reservations = [reservations];

    for( var i =0;i< reservations.length;i++ ) {
      reservation = reservations[i];
    }
    
    this.db.save(reservations, function(error, result) {
      if( error ) callback(error)
      else {
        db.save('_design/reservation', {
          all: {
            map: function (doc) {
              emit(doc.name, doc);
            }
          }
        });
        callback(null, reservations)
      };
    });
};

exports.ReservationProvider = ReservationProvider;