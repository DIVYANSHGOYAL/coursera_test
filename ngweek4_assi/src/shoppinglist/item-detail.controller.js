(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['item','id'];
function ItemDetailController(item, id) {
  // console.log(items[$stateParams.itemId].short_name);
  var itemDetail = this;
  console.log(id);
  itemDetail.number = id;
  itemDetail.item = item;
  console.log("itemDetail is ", itemDetail.item);


}

})();
