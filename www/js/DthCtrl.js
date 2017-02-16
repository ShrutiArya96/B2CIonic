(function() {
    'use strict';
    var dthRechargeCtrl = function($scope, $rootScope, $ionicLoading, $ionicPopup, RechargeFact, $http) {

        $scope.DthRecharge = {};
        $scope.DthRechargeModel = {};

        var original;

        $scope.DthRechargeModel = {
            Dtype: 'dth',
            operator: '',
            customerid: '',
            amount: '',
            accountNo: '',
            stdCode: '',
            circle: '',
            auth: ''
        };

        original = angular.copy($scope.DthRechargeModel);

        $scope.revert = function() {
            $scope.DthRechargeModel = angular.copy(original);
            $scope.DthRecharge.DthForm.$setPristine();
            $scope.DthRecharge.DthForm.$setUntouched();
            return;
        };



        $scope.DthRecharge = function(validity) {
        	if(validity){
             $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
            RechargeFact.PostDthRecharge($scope.DthRechargeModel.operator,
                $scope.DthRechargeModel.customerid,
                $scope.DthRechargeModel.amount,
                $scope.DthRechargeModel.accountNo,
                $scope.DthRechargeModel.stdCode,
                $scope.DthRechargeModel.Dtype,
                $scope.DthRechargeModel.circle,
                $scope.DthRechargeModel.auth).then(
                function(successresponse) {
                    $ionicLoading.hide();
                    console.log("success posting");
                    console.log(successresponse);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: successresponse.data.statusDesc
                    });
                    $scope.revert();

                },
                function(errormessage) {
                	 $scope.revert();
                    $ionicLoading.hide();
                    console.log(errormessage);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: errormessage.data.statusDesc
                    });

                });
            }
        };

    };
    dthRechargeCtrl.$inject = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'RechargeFact', '$http'];
    angular.module("App").controller('dthRechargeCtrl', dthRechargeCtrl);

}());
