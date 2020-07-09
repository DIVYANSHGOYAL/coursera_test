(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$q', '$timeout','$http']
function ShoppingListService($q, $timeout, $http) {
  var service = this;

  // List of shopping items
  var items = [];
  var item = [];
  // Pre-populate a no cookie list
  service.getMenuCategories = function () {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"
    });
    return response;
  };

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function (promise) {
    var deferred = $q.defer();
    promise.then(function (response) {
      items = response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };

  service.getMenuForCategory = function (shortName) {
    console.log("inside item");
    var response = $http({
      method:"GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json",
      params:{
        category: shortName
      }
    });
    return response;
  };

  service.getItem = function (promise) {
    var deferred = $q.defer();
    promise.then(function (response) {
      item = response.data.menu_items;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(item);
    }, 800);

    return deferred.promise;
  };
}

})();
