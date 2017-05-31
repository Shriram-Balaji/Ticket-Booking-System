'use strict';
const ticketController = app.controller('TicketController', function($scope, MoviesFactory) {
  //Initialization
  $scope.selectedSeats = {};
  $scope.nothingSelected = true;
  $scope.numberOfSeats = 0;
  $scope.bookingCompleted = false;

  //Getting Data From Factory
  $scope.init = function() {
    //Default Values for the number of rows and columns
    $scope.totalColumns = 15;
    $scope.totalRows = 4;
    $scope.ticketDetails = MoviesFactory.getTicketAvailability();
    $scope.ticketDetails.then(function(response) {
      $scope.takenSeats = response.screen1.availability.taken;
      //columnNumbering
      $scope.seatsInEachColumn = [];
      for (let i = 1; i <= $scope.totalColumns; i++) {
        $scope.seatsInEachColumn.push(i);
      }

      //alphabetical Row Naming
      $scope.rowNames = [];
      for (let i = 65; i < 65 + $scope.totalRows; i++)
        $scope.rowNames.push(String.fromCharCode(i));
    });
  }


  //ticketCount
   $scope.getTicketCount = function(selectedSeats){
     let len = Object.keys(selectedSeats).length;
     if(len<=1){
       return len+" seat";
     }
     else
        return len+" seats";
  }


  //When Seat Selected
  $scope.selectSeat = function(selected, row, col) {
    $scope.nothingSelected = false;
    let seatLocation = row + col;
    if (selected) {
      $scope.selectedSeats[seatLocation] = true;
    } else { //if seat deselected
      delete $scope.selectedSeats[seatLocation];
      if (Object.keys($scope.selectedSeats).length === 0 && $scope.selectedSeats.constructor === Object) {
        $scope.nothingSelected = true;
      }
    }
  }

  //refresh controller on booking completion
  let reload = function() {
    $scope.currentBooking = $scope.selectedSeats;
    $scope.init();
    $scope.selectedSeats = {};
    $scope.nothingSelected = true;
    $scope.bookingCompleted = false;
  }


  let showSnackbar = function() {
    // Get the snackbar DIV
    reload();
    var x = document.getElementById("notification");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
      $scope.currentBooking = {};
    }, 3000);
  }


  //Book the selected seats
  $scope.bookTickets = function() {
    let bookingStatus = MoviesFactory.bookSeats($scope.selectedSeats).then(function(response) {
      showSnackbar();
      $scope.bookingCompleted = true;
    })
  }
  //end controller
});
