(function () {
'use strict';

angular.module('ShoppingList')
.component('itemList', {
  templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
  bindings: {
    item: '<'
  }
});
//console.log("Inside intem detail list component");

})();
