(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['item','items','$stateParams'];
function ItemDetailController(item, $stateParams, items) {
  // console.log(items[$stateParams.itemId].short_name);
  var itemDetail = this;
  // itemDetail.shortName = items[$stateParams.itemId].short_name;
  itemDetail.item = item;
  console.log("itemDetail is ", itemDetail.item);


}

})();
