(function () {
  'use strict'

  angular.module('ShoppingListCheckOff',[])
  .controller('ShoppingListToBuyItemController',ShoppingListToBuyItemController)
  .controller('ShoppingListBoughtItemController',ShoppingListBoughtItemController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService)

  ShoppingListToBuyItemController.$inject=['ShoppingListCheckOffService'];
  function ShoppingListToBuyItemController(ShoppingListCheckOffService) {
    var ToBuyController=this;

    ToBuyController.items=ShoppingListCheckOffService.getToBuyItems();
    ToBuyController.removeItem=function (itemIndex) {
      ShoppingListCheckOffService.removeTobuyItemToBoughtItem(itemIndex);

      ToBuyController.message=ShoppingListCheckOffService.emptyToBuyListmessage();
    };


  }

  ShoppingListBoughtItemController.$inject=['ShoppingListCheckOffService','$rootScope'];
  function ShoppingListBoughtItemController(ShoppingListCheckOffService,$rootScope) {
    var AlreadyBoughtController=this;
    AlreadyBoughtController.counter =0;

    AlreadyBoughtController.items=ShoppingListCheckOffService.getBoughtItems();
    AlreadyBoughtController.message=ShoppingListCheckOffService.emptyBoughtListMessage(AlreadyBoughtController.counter);
    $rootScope.$on("event",function () {
      AlreadyBoughtController.counter=ShoppingListCheckOffService.getCount();
      AlreadyBoughtController.message=
      ShoppingListCheckOffService.emptyBoughtListMessage(AlreadyBoughtController.counter);
    });



  }

  function ShoppingListCheckOffService($rootScope) {
    var service = this;
    service.count=0;

    var tobuyitems =[
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Chocolate",
        quantity: "5"
      },

      {
        name: "Chips",
        quantity: "10"
      }
    ];

    var boughtitems = [];

    service.getToBuyItems=function () {
      return tobuyitems;
    };

    service.removeTobuyItemToBoughtItem = function (itemIndex) {
      boughtitems.push(tobuyitems[itemIndex]);
      service.count++;
      $rootScope.$emit("event")
      tobuyitems.splice(itemIndex,1);
    };

    service.getCount=function () {
      return service.count;
    };

    service.emptyToBuyListmessage=function () {
      return (tobuyitems.length==0);
    };

    service.getBoughtItems=function () {
      return boughtitems;
    };

    service.emptyBoughtListMessage=function (count) {
      return (count==0);
    };

  }

})();
