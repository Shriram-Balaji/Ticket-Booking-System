'use strict';
const ticketController = app.controller('TicketController',function($scope, MoviesFactory){
$scope.ticketCount = 0;

//Promise returned from http call
var ticketDetails = MoviesFactory.getTicketAvailability();
ticketDetails.then(function(response){
  $scope.totalColumns = response.screen1.columns;
  $scope.totalRows = response.screen1.rows;
  $scope.takenSeats = response.screen1.availability.taken;

//columnNumbering
  $scope.seatsInEachColumn = [];
  for(var i=0;i< $scope.totalColumns;i++) {
    $scope.seatsInEachColumn.push(i);
  }

//alphabetical Row Naming
$scope.rowNames = [];
for(var i=65;i<65+$scope.totalRows;i++)
  $scope.rowNames.push(String.fromCharCode(i));
});



//end controller
});
