(function() {
    'use strict';
    var gasPaybillCtrl = function($scope, $rootScope, $ionicLoading, $ionicPopup, RechargeFact, $http, API) {
        $scope.GasForm = {};
        $scope.GasForm.gas = {};
        $scope.GasBillModel = {};
        $scope.placeholderPhone = {};
        $scope.placeholderAccount = {};
        $scope.placeholderService = {};
        $scope.placeholderAmount = {};
        $scope.AccoutField = false;
        $scope.submitFlag = false;
        var original;

        $scope.GasBillModel = {
            gasType: 'bill',
            phnumber: '',
            operator: '',
            amount: '',
            accountNo: '',
            stdCode: '',
            circle: '',
            auth: ''
        };

        original = angular.copy($scope.GasBillModel);
        $scope.GasFormRevert = function() {
            $scope.GasBillModel = angular.copy(original);
            $scope.GasForm.gas.$setPristine();
            $scope.GasForm.gas.$setUntouched();
            return;
        };

        $scope.$watch('GasBillModel.operator', function(currentval, oldval) {
            if ($scope.GasBillModel.operator == "Mahanagar Gas Limited Utility") {
                $scope.GasBillModel.gasType = "Utility_bills";
                $scope.AccoutField = true;
                $scope.submitFlag = false;
                $scope.placeholderPhone = "Customer Account Number";
                $scope.placeholderAccount = "Bill Group Number";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.GasBillModel.operator == "ADANI GAS") {
                $scope.AccoutField = false;
                $scope.submitFlag = false;
                $scope.GasBillModel.gasType = "bill";
                $scope.placeholderPhone = "Customer ID";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else {
                $scope.AccoutField = false;
                $scope.submitFlag = false;
                $scope.GasBillModel.gasType = "bill";
                $scope.placeholderPhone = "Service Number";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            }
        });


        // fetch bill amount

        $scope.FetchBillAmount = function(validity) {
            if (validity) {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                var fetch_amount = JSON.stringify({
                    'mobileNumber': $scope.GasBillModel.phnumber,
                    'operatorCode': $scope.GasBillModel.operator,
                    'amount': $scope.GasBillModel.amount,
                    'stdCode': $scope.GasBillModel.stdCode,
                    'accountNo': $scope.GasBillModel.accountNo,
                    'rechargeType': $scope.GasBillModel.gasType,
                    'circleCode': $scope.GasBillModel.circle,
                    'auth': $scope.GasBillModel.auth
                });
                $http({
                        method: 'POST',
                        url: API + 'fetchbillamount.json',
                        contentType: 'application/json',
                        data: fetch_amount
                    })
                    .then(
                        function(successresponse) {
                            $ionicLoading.hide();
                            $scope.GasBillModel.amount = parseInt(successresponse.data.statusDesc);
                            $scope.submitFlag = true;
                        },
                        function(errorresponse) {
                            $ionicLoading.hide();
                            console.log(errorresponse);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: errorresponse.data.statusDesc
                            });
                        });
            }
        };

        $scope.GasBillPay = function(validity) {
            if (validity) {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                RechargeFact
                    .UtilityBillPay($scope.GasBillModel.phnumber,
                        $scope.GasBillModel.operator,
                        $scope.GasBillModel.amount,
                        $scope.GasBillModel.gasType,
                        $scope.GasBillModel.accountNo,
                        $scope.GasBillModel.stdCode,
                        $scope.GasBillModel.circle,
                        $scope.GasBillModel.auth)
                    .then(
                        function(successresponse) {
                            $ionicLoading.hide();
                            console.log("success posting");
                            console.log(successresponse);
                            $scope.GasFormRevert();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: successresponse.data.statusDesc
                            });
                        },
                        function(errormessage) {
                            $scope.GasFormRevert();
                            $ionicLoading.hide();
                            console.log(errormessage);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: errormessage.data.statusDesc
                            });


                        });
            }
        };

    };
    gasPaybillCtrl.$inject = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'RechargeFact', '$http', 'API'];
    angular.module("App").controller('gasPaybillCtrl', gasPaybillCtrl);

}());
