(function() {
    'use strict';
    var sendmoneyController = function($scope, $rootScope, $ionicLoading, $ionicPopup, $http, API) {

        $scope.upimodel = {};


        $scope.UPIcollect = function() {
            var sendmoneyObj = JSON.stringify({
                appName: 'merchantApp',
                merchantTxnID: '',
                mid: 'YES0000000000196',
                merchantKey: '3125ead55992537db58311dc09d0fc49',
                currency: "INR",
                paymentType:"P2M",
                payerPaymentAddress: $scope.upimodel.VirtualId,
                amount:$scope.upimodel.amount
            });
          window.plugins.intent.UPITran(sendmoneyObj, success, failure);
        };

        var success = function(message) {
            alert(message);
            console.log(message);
            updatevpa(message);
        }

        var failure = function(error) {
            console.log(error);
            alert("Error calling Hello Plugin");
        }

    };
    sendmoneyController.$inject = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', '$http', 'API'];
    angular.module("App").controller('sendmoneyController', sendmoneyController);

}());
