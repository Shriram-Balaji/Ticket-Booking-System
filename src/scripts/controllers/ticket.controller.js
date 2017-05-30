'use strict';
const ticketController = app.controller('TicketController', function($scope, $state, MoviesFactory) {
  $scope.selectedSeats = {};
  $scope.nothingSelected = true;
  $scope.numberOfSeats = 0;
  $scope.bookingCompleted = false;
  //Initial Getting Data From Factory
  $scope.init = function(){


//Default Values for the number of rows and columns
  $scope.totalColumns = 15;
  $scope.totalRows = 4;


  $scope.ticketDetails = MoviesFactory.getTicketAvailability();
    $scope.ticketDetails.then(function(response) {
    $scope.takenSeats = response.screen1.availability.taken;
    console.log($scope.takenSeats);


    //columnNumbering
    $scope.seatsInEachColumn = [];
    for (let i = 1; i <=$scope.totalColumns; i++) {
      $scope.seatsInEachColumn.push(i);
    }

    //alphabetical Row Naming
    $scope.rowNames = [];
    for (let i = 65; i < 65 + $scope.totalRows; i++)
      $scope.rowNames.push(String.fromCharCode(i));
  });
}
  //When Seat Selected
  $scope.selectSeat = function(selected, row, col) {
    $scope.nothingSelected = false;
    let seatLocation = row + col;
    if (selected) {
      $scope.selectedSeats[seatLocation] = true;
    } else{
      delete $scope.selectedSeats[seatLocation];
      if(Object.keys($scope.selectedSeats).length === 0 && $scope.selectedSeats.constructor === Object){
        $scope.nothingSelected = true;
      }
    }
  }

 //refresh
  let reload = function(){
    $scope.init();
    $scope.selectedSeats = {};
    $scope.nothingSelected = true;
    $scope.bookingCompleted = false;
  }

//Selected seats are booked
  $scope.bookTickets = function(){

    //if there are more than one selectedSeats.
   let bookingStatus = MoviesFactory.bookSeats($scope.selectedSeats).then(function(response){
     console.log(response);
     $scope.bookingCompleted = true;

   }).then(function(){
     reload();
   });
}


  //end controller
});
