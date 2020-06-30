(function () {
  'use strict'

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems);

  function FoundItems() {
    var ddo ={
      templateUrl: 'foundItems.html',
      scope:{
        foundItems: '<',
        onRemove: '&'
      }
    };
    return ddo;
  };


  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {

    var menu = this;
    menu.searchTerm="";
    menu.foundItems=[];

    menu.found = function () {
      var promise = MenuSearchService.getMatchedMenuItems();
      console.log(promise);
      promise.then(function (result) {
        for (var i = result.data.menu_items.length - 1; i >= 0; i--) {
          if(result.data.menu_items[i].description.toLowerCase().indexOf(menu.searchTerm.toLowerCase()) !== -1){
            menu.foundItems.push(result.data.menu_items[i]);
          }
        }
        console.log(menu.foundItems);
      });
    };


    menu.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject=['$http']
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function () {
      var response = $http({
        method : "GET",
        url : "https://davids-restaurant.herokuapp.com/menu_items.json"
      });

      return response;
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

  }

})();
