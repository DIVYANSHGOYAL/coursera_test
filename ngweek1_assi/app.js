(function(){

'use strict'

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject=['$scope'];
function LunchCheckController($scope){
  $scope.items = "";
  $scope.stateOfList = ""
  $scope.listStatus = function () {
    var totalItems = numberOfItems($scope.items);
    if(totalItems == 0){
      $scope.stateOfList = "Please enter data first";
    }
    else if (totalItems > 3) {
      $scope.stateOfList = "Too much!";
    }
    else {
      $scope.stateOfList = "Enjoy";
    }
    };

    function numberOfItems(string) {
    var elements = string.split(',');
      var count = 0;
      for(var i=0; i<elements.length; i++){
        if(elements[i].trim() != ''){
          ++count;
        }
      }
      return count;

    }


}
})();
