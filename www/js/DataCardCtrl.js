(function() {
    'use strict';
    var datacardRechargeCtrl = function($scope, $rootScope, $ionicLoading, $ionicPopup, RechargeFact, $http) {
       $scope.DataCardRechargeModel = {};
       $scope.DataCardForm = {};
        var original;

        $scope.DataCardRechargeModel = {
            DataType: 'datacard',
            datacardno: '',
            operator: '',
            amount: '',
            accountNo: '',
            stdCode: '',
            circle: '',
            auth: ''

        };

        original = angular.copy($scope.DataCardRechargeModel);
        $scope.DatacardFormRevert = function() {
            $scope.DataCardRechargeModel = angular.copy(original);
            $scope.DataCardForm.DataCard.$setPristine();
            $scope.DataCardForm.DataCard.$setUntouched();
            return;
        };



        $scope.DataCardRecharge = function(validity) {
        	if(validity){
            $ionicLoading.show();
            RechargeFact.PostDataCardRecharge(
                $scope.DataCardRechargeModel.datacardno,
                $scope.DataCardRechargeModel.operator,
                $scope.DataCardRechargeModel.amount,
                $scope.DataCardRechargeModel.accountNo,
                $scope.DataCardRechargeModel.stdCode,
                $scope.DataCardRechargeModel.DataType,
                $scope.DataCardRechargeModel.circle,
                $scope.DataCardRechargeModel.auth).then(
                function(successresponse) {
                    $ionicLoading.hide();
                    console.log("success posting");
                    console.log(successresponse);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: successresponse.data.statusDesc
                    });
                    $scope.DatacardFormRevert();

                },
                function(errormessage) {
                    $ionicLoading.hide();
                    $scope.DatacardFormRevert();
                    console.log(errormessage);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: errormessage.data.statusDesc
                    });

                });
        }
    };
      
    };
   datacardRechargeCtrl.$inject = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'RechargeFact', '$http'];
    angular.module("App").controller('datacardRechargeCtrl', datacardRechargeCtrl);

}());
