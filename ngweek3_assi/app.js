var app = angular.module('NarrowItDownApp', []);

app.controller('NarrowItDownController', ['$scope', 'MenuSearchService', function($scope, MenuSearchService) {
    $scope.searchTerm = '';
    $scope.search = function(searchTerm) {
      console.log('Searching for ' + searchTerm);
      MenuSearchService.getMatchedMenuItems(searchTerm).then(function(foundItems) {
        $scope.results = foundItems;
      });
    };

    $scope.search($scope.searchTerm);
}]);

app.service('MenuSearchService', ['$http', function($http) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            })
            .then(function(response) {
                var result = response.data.menu_items;
                console.log('Result: ' + result.length);
                var foundItems = [];
                result.forEach(function(obj) {
                    if (searchTerm != '') {
                        if ((obj.name.indexOf(searchTerm) != -1) || (obj.description.indexOf(searchTerm) != -1)) {
                            foundItems.push(obj);
                        }
                    }
                })
                console.log('Found Items: ' + foundItems.length)
                return foundItems;

            }, function(error) {
                console.log('Error from $http' + error);
            });
    }
}]);

app.directive('foundItems', function() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
          items: '='
      },
      controller: function ($scope) {
        $scope.remove = function (item) {
          var index = $scope.items.indexOf(item);
          if(index >= 0) {
            $scope.items.splice(index, 1);
          }
        }
      }
    }
    return ddo;
});
