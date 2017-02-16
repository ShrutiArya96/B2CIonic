(function() {
    'use strict';
    var insuranceBillPayCtrl = function($scope, $rootScope, $ionicLoading, $ionicPopup, RechargeFact, $http,API) {


        $scope.InsuranceForm = {};
        $scope.InsuranceForm.insurance = {};
        $scope.InsuranceModel = {};
        $scope.submitFlag = false;
        var original;
        $scope.InsuranceModel = {
           InType: 'Utility_bills',
            INnumber: '',
            operator: '',
            amount: '',
            dob: '',
            stdCode: '',
            circle: '',
            auth: ''
        };

        original = angular.copy($scope.InsuranceModel);
        $scope.InsuranceFormRevert = function() {
            $scope.InsuranceModel = angular.copy(original);
            $scope.InsuranceForm.insurance.$setPristine();
            $scope.InsuranceForm.insurance.$setUntouched();
            return;
        };



        // fetch bill amount

        $scope.InsuranceFetchBillAmount = function(validity) {
        	if(validity){
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                var fetch_amount = JSON.stringify({
                    'mobileNumber': $scope.InsuranceModel.INnumber,
                    'operatorCode': $scope.InsuranceModel.operator,
                    'amount': $scope.InsuranceModel.amount,
                    'stdCode': $scope.InsuranceModel.stdCode,
                    'accountNo': $scope.InsuranceModel.dob,
                    'rechargeType': $scope.InsuranceModel.InType,
                    'circleCode': $scope.InsuranceModel.circle,
                    'auth': $scope.InsuranceModel.auth
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
                            $scope.InsuranceModel.amount = parseInt(successresponse.data.statusDesc);
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

        $scope.GasBillPay = function(validity) {
            if (validity) {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                RechargeFact
                    .UtilityBillPay($scope.InsuranceModel.INnumber,
                        $scope.InsuranceModel.operator,
                        $scope.InsuranceModel.amount,
                        $scope.InsuranceModel.InType,
                        $scope.InsuranceModel.dob,
                        $scope.InsuranceModel.stdCode,
                        $scope.InsuranceModel.circle,
                        $scope.InsuranceModel.auth)
                    .then(
                        function(successresponse) {
                            $ionicLoading.hide();
                            console.log("success posting");
                            console.log(successresponse);
                            $scope.InsuranceFormRevert();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: successresponse.data.statusDesc
                            });
                        },
                        function(errormessage) {
                            $scope.InsuranceFormRevert();
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
    insuranceBillPayCtrl.$inject = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'RechargeFact', '$http','API'];
    angular.module("App").controller('insuranceBillPayCtrl', insuranceBillPayCtrl);

}());
