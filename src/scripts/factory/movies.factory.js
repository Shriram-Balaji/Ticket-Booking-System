const movies = angular.module('TicketMachine').factory('MoviesFactory', function($http) {
  var tickets = {};
  //function to get list of all tickets
  tickets.getTicketAvailability = function() {
    return $http.get('/data').then(function(response) {
      //First function handles success
      return response.data;
    }, function(response) {
      //Second function handles error
      console.log("Something went wrong");
    });
  };

  //function to book tickets
  tickets.bookSeats = function(ticketData) {
    return $http.post('/booking', ticketData).then(function(data) {
      //Success callback
      console.log(data);
    }, function(err) {
      //Error callback
      console.error("There was an error in booking the tickets" + err);
    });
  };

  return tickets;

})
