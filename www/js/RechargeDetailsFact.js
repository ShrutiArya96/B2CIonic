(function() {
    'use strict';
    // This function handles all requests for bene and its response data storage
    var Rechargedetails = function($http, API) {
        var Transaction_Details = {};
        var rechrge_data;
        Transaction_Details.setRechargeData= function(data){
         rechrge_data = data;
        };
       Transaction_Details.getRechargeData = function(){
        return rechrge_data;
       }
        return Transaction_Details;
    };

    Rechargedetails.$inject = ['$http', 'API'];
    angular.module("App").factory('Rechargedetails', Rechargedetails);
}());
