(function () {
  'use strict'

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo ={
      templateUrl: 'foundList.html',
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

    menu.found = function () {
      MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    };

    menu.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject=['$http']
  function MenuSearchService($http) {
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method : "GET",
        url : "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function (result) {
        for (var i = result.data.menu_items.length - 1; i >= 0; i--) {
          if(result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
            foundItems.push(result.data.menu_items[i]);
          }
        }
        console.log(foundItems);
        return foundItems;
      });
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

  }

})();
