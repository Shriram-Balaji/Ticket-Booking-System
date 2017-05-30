const movies = angular.module('TicketMachine').factory('MoviesFactory', function($http) {
  var tickets = {};
  tickets.getTicketAvailability = function() {
    return $http.get('/data').then(function(response) {
        //First function handles success
        return response.data;

    }, function(response) {
        //Second function handles error
       console.log("Something went wrong");
    });
};

  tickets.bookSeats = function(ticketData){
    return $http.post('/booking',ticketData).then(function(data){
      console.log(data);
    });
  };

  return tickets;

})
