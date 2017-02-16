(function() {
    'use strict';
    var electricityBillPayCtrl = function($scope, $rootScope, $ionicLoading, $ionicPopup, RechargeFact, $http, API) {

        $scope.ElectricityForm = {};
        $scope.ElectricityForm.Electricity = {};
        $scope.ElectricityModel = {};
        $scope.placeholderPhone = {};
        $scope.placeholderAccount = {};
        $scope.placeholderService = {};
        $scope.placeholderAmount = {};
        $scope.placeholderOperator = {};
        $scope.AccoutField = false;
        $scope.submitFlag = false;
        $scope.AuthField = false;
        $scope.BauthField = false;
        var original;

        $scope.ElectricityModel = {
            electType: 'bill',
            phnumber: '',
            operator: '',
            amount: '',
            accountNo: '',
            stdCode: '',
            circle: '',
            auth: '',
            Bauth: ''
        };

        original = angular.copy($scope.ElectricityModel);
        $scope.ElectrictyFormRevert = function() {
            $scope.ElectricityModel = angular.copy(original);
            $scope.ElectricityForm.Electricity.$setPristine();
            $scope.ElectricityForm.Electricity.$setUntouched();
            return;
        };

        $scope.$watch('ElectricityModel.operator', function(currentval, oldval) {
            if ($scope.ElectricityModel.operator == "Reliance Energy(Mumbai) Utility") {
                $scope.ElectricityModel.electType = "Utility_bills";
                $scope.AccoutField = true;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.placeholderPhone = "Customer number";
                $scope.placeholderAccount = "Cycle Number";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.ElectricityModel.operator == "MSEDC Limited Utility") {
                $scope.AccoutField = true;
                $scope.AuthField = true;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.ElectricityModel.electType = 'Utility_bills';
                $scope.placeholderPhone = "Customer number";
                $scope.placeholderAccount = "Billing Unit";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderService = "Processing Cycle";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.ElectricityModel.operator == "Torrent Power Utility") {
                $scope.AccoutField = true;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.ElectricityModel.electType = "Utility_bills";
                $scope.placeholderAccount = "City";
                $scope.placeholderPhone = "Service Number";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.ElectricityModel.operator == "BSES Rajdhani" || $scope.ElectricityModel.operator == "BSES Yamuna" || $scope.ElectricityModel.operator == "North Delhi Power Limited" || $scope.ElectricityModel.operator == "Madhya Pradesh Madhya Kshetra Vidyut Vitaran Company Limited - Bhopal" || $scope.ElectricityModel.operator == "Noida Power Company Limited" || $scope.ElectricityModel.operator == "Madhya Pradesh Paschim Kshetra Vidyut Vitaran Indor" || $scope.ElectricityModel.operator == "India Power Corporation Limited" || $scope.ElectricityModel.operator == "Bangalore Electricity Supply Company") {
                $scope.AccoutField = false;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.ElectricityModel.electType = 'bill';
                $scope.placeholderPhone = "Customer number";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.ElectricityModel.operator == "Reliance Energy(Mumbai) Utility") {
                $scope.AccoutField = true;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.placeholderPhone = "Customer number";
                $scope.placeholderAccount = "Cycle Number";
                $scope.ElectricityModel.electType = "Utility_bills";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.ElectricityModel.operator == "Brihan Mumbai Electric Supply and Transport Undertaking" || $scope.ElectricityModel.operator == "Southern power Distribution Company Ltd of Andhra Pradesh( APSPDCL)") {
                $scope.AccoutField = false;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.ElectricityModel.electType = "bill";
                $scope.placeholderPhone = "Service Number";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.ElectricityModel.operator == "Rajasthan Vidyut Vitran Nigam Limited") {
                $scope.AccoutField = false;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.ElectricityModel.electType = "bill";
                $scope.placeholderPhone = "K Number ";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else if ($scope.ElectricityModel.operator == "Calcutta Electricity Supply Ltd") {
                $scope.AccoutField = false;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.ElectricityModel.electType = "bill";
                $scope.placeholderPhone = "Consumer ID";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            } else {
                $scope.AccoutField = false;
                $scope.AuthField = false;
                $scope.BauthField = false;
                $scope.submitFlag = false;
                $scope.ElectricityModel.electType = "bill";
                $scope.placeholderPhone = "Consumer ID";
                $scope.placeholderOperator = "Select Operator";
                $scope.placeholderAmount = "Amount";
            }
        });


        // fetch bill amount
        var auth;
        $scope.ElectricityFetchBillAmount = function(validity) {
            if (validity) {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                if ($scope.ElectricityModel.auth == '') {
                    auth = $scope.ElectricityModel.Bauth;
                } else {
                    auth = $scope.ElectricityModel.auth;
                }
                var fetch_amount = JSON.stringify({
                    'mobileNumber': $scope.ElectricityModel.phnumber,
                    'operatorCode': $scope.ElectricityModel.operator,
                    'amount': $scope.ElectricityModel.amount,
                    'stdCode': $scope.ElectricityModel.stdCode,
                    'accountNo': $scope.ElectricityModel.accountNo,
                    'rechargeType': $scope.ElectricityModel.electType,
                    'circleCode': $scope.ElectricityModel.circle,
                    'auth': auth
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
                            $scope.ElectricityModel.amount = parseInt(successresponse.data.statusDesc);
                            $scope.submitFlag = true;
                        },
                        function(errorresponse) {
                            $ionicLoading.hide();
                            console.log(errorresponse);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: errorresponse.data.statusDesc
                            });
                        });
            }
        };

        $scope.ElectrictyBillPay = function(validity) {
            if (validity) {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                RechargeFact
                    .UtilityBillPay($scope.ElectricityModel.phnumber,
                        $scope.ElectricityModel.operator,
                        $scope.ElectricityModel.amount,
                        $scope.ElectricityModel.electType,
                        $scope.ElectricityModel.accountNo,
                        $scope.ElectricityModel.stdCode,
                        $scope.ElectricityModel.circle,
                        $scope.ElectricityModel.auth,
                        $scope.ElectricityModel.Bauth)
                    .then(
                        function(successresponse) {
                            $ionicLoading.hide();
                            console.log("success posting");
                            console.log(successresponse);
                            $scope.ElectrictyFormRevert();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: successresponse.data.statusDesc
                            });
                        },
                        function(errormessage) {
                            $scope.ElectrictyFormRevert();
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
    electricityBillPayCtrl.$inject = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'RechargeFact', '$http', 'API'];
    angular.module("App").controller('electricityBillPayCtrl', electricityBillPayCtrl);

}());
