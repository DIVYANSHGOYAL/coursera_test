(function () {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/shoppinglist/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    controller: 'MainShoppingListController as mainList',
    resolve: {
      items: ['ShoppingListService', function (ShoppingListService) {
        var promise = ShoppingListService.getMenuCategories();
        return ShoppingListService.getItems(promise);
      }]
    }
  })

  // Item detail
  .state('mainList.itemDetail', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/shoppinglist/templates/main-itemlist.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve: {
      item: ['$stateParams', 'ShoppingListService','items',
      function ($stateParams, ShoppingListService, items) {
        console.log(items[$stateParams.itemId].short_name);
        var promise = ShoppingListService.getMenuForCategory(
          items[$stateParams.itemId].short_name);
        return ShoppingListService.getItem(promise);
      }]
    }
  });

}

})();
