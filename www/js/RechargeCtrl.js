(function() {
    'use strict';
    var RechargeCtrl = function($scope, $rootScope, $ionicLoading, $ionicPopup, RechargeFact, $http, store, API,$window, $location) {
        $scope.circlefield = false;
        $scope.RechargeModel = {};
        $scope.SpecialRechargeModel = {};
        $scope.PostPaidRechargeModel = {};
        $scope.RechargeForm = {};
        $scope.Mobile = {};
        $scope.Mobile.Type = 'Top-Up';
        var original;

        $scope.RechargeModel = {
            type: "Rr",
            phnumber: '',
            operator: '',
            amount: '',
            circle: '',
            accountNo: '',
            stdCode: '',
            auth: '',
            Optype: 'recharge',
        };

        $scope.operator = {
            "TopUp": [{
                "name": "AIRCEL",
                "value": "AIRCEL"
            }, {
                "name": "AIRTEL",
                "value": "AIRTEL"
            }, {
                "name": "BSNL",
                "value": "BSNL"
            }, {
                "name": "IDEA",
                "value": "IDEA"
            }, {
                "name": "LOOP",
                "value": "LOOP"
            }, {
                "name": "MTNL DELHI",
                "value": "MTNL DELHI"
            }, {
                "name": "MTNL MUMBAI",
                "value": "MTNL MUMBAI"
            }, {
                "name": "MTS",
                "value": "MTS"
            }, {
                "name": "RELIANCE CDMA",
                "value": "RELIANCE CDMA"
            }, {
                "name": "RELIANCE GSM",
                "value": "RELIANCE GSM"
            }, {
                "name": "TATA DOCOMO",
                "value": "TATA DOCOMO"
            }, {
                "name": "TELENOR",
                "value": "TELENOR"
            }, {
                "name": "VIDEOCON",
                "value": "VIDEOCON"
            }, {
                "name": "VIRGIN CDMA",
                "value": "VIRGIN CDMA"
            }, {
                "name": "VIRGIN GSM",
                "value": "VIRGIN GSM"
            }, {
                "name": "VODAFONE",
                "value": "VODAFONE"
            }, {
                "name": "TataIndicom",
                "value": "TataIndicom"
            }, {
                "name": "T24(Flexi)",
                "value": "T24(Flexi)"
            }],
            "Special": [{
                "name": "TATA DOCOMO stv",
                "value": "TATA DOCOMO stv"
            }, {
                "name": "T24(Special)",
                "value": "T24(Special)"
            }, {
                "name": "BSNL VALIDITY",
                "value": "BSNL VALIDITY"
            }, {
                "name": "MTNL Validity",
                "value": "MTNL Validity"
            }],
            "PostPaid": [{
                "name": "AIRCEL POSTPAID",
                "value": "AIRCEL POSTPAID"
            }, {
                "name": "BSNL POSTPAID",
                "value": "BSNL POSTPAID"
            }, {
                "name": "IDEA POSTPAID",
                "value": "IDEA POSTPAID"
            }, {
                "name": "RELIANCE POSTPAID",
                "value": "RELIANCE POSTPAID"
            }, {
                "name": "TATA DOCOMO POSTPAID",
                "value": "TATA DOCOMO POSTPAID"
            }, {
                "name": "VODAFONE POSTPAID",
                "value": "VODAFONE POSTPAID"
            }, {
                "name": "AIRTEL POSTPAID",
                "value": "AIRTEL POSTPAID"
            }, {
                "name": "RELIANCE CDMA POSTPAID",
                "value": "RELIANCE CDMA POSTPAID"
            }, {
                "name": "TATA INDICOM POSTPAID",
                "value": "TATA INDICOM POSTPAID"
            }, {
                "name": "LOOP POSTPAID",
                "value": "LOOP POSTPAID"
            }, {
                "name": "BSNL LANDLINE",
                "value": "BSNL LANDLINE"
            }, {
                "name": "AIRTEL BROADBAND (DSL)",
                "value": "AIRTEL BROADBAND (DSL)"
            }, {
                "name": "AIRTEL LANDLINE",
                "value": "AIRTEL LANDLINE"
            }, {
                "name": "IDEA LANDLINE",
                "value": "IDEA LANDLINE"
            }, {
                "name": "MTS POSTPAID",
                "value": "MTS POSTPAID"
            }],
            "circle": [{
                "value": "AndamanNicrobar",
                "name": "Andaman Nicrobar"
            }, {
                "value": "AndhraPradesh",
                "name": "AndhraPradesh"
            }, {
                "value": "ArunachalPradesh",
                "name": "Arunachal Pradesh"
            }, {
                "value": "Assam",
                "name": "Assam"
            }, {
                "value": "Bangalore",
                "name": "Bangalore"
            }, {
                "value": "Bihar",
                "name": "Bihar"
            }, {
                "value": "Chennai",
                "name": "Chennai"
            }, {
                "value": "Chhattisgarh",
                "name": "Chhattisgarh"
            }, {
                "value": "DadraandNagarHaveli",
                "name": "Dadraand NagarHaveli"
            }, {
                "value": "DamanandDiu",
                "name": "Damanand Diu"
            }, {
                "value": "Delhi",
                "name": "Delhi"
            }, {
                "value": "Goa",
                "name": "Goa"
            }, {
                "value": "Gujarat",
                "name": "Gujarat"
            }, {
                "value": "Haryana",
                "name": "Haryana"
            }, {
                "value": "HimachalPradesh",
                "name": "HimachalPradesh"
            }, {
                "value": "JammuAndKashmir",
                "name": "Jammu And Kashmir"
            }, {
                "value": "Jharkhand",
                "name": "Jharkhand"
            }, {
                "value": "Karnataka",
                "name": "Karnataka"
            }, {
                "value": "Kerala",
                "name": "Kerala"
            }, {
                "value": "Kolkata",
                "name": "Kolkata"
            }, {
                "value": "MadhyaPradesh",
                "name": "Madhya Pradesh"
            }, {
                "value": "Maharashtra",
                "name": "Maharashtra"
            }, {
                "value": "Manipur",
                "name": "Manipur"
            }, {
                "value": "Meghalaya",
                "name": "Meghalaya"
            }, {
                "value": "Mizoram",
                "name": "Mizoram"
            }, {
                "value": "Mumbai",
                "name": "Mumbai"
            }, {
                "value": "Nagaland",
                "name": "Nagaland"
            }, {
                "value": "Orissa",
                "name": "Orissa"
            }, {
                "value": "Pondicherry",
                "name": "Pondicherry"
            }, {
                "value": "Punjab",
                "name": "Punjab"
            }, {
                "value": "Rajasthan",
                "name": "Rajasthan"
            }, {
                "value": "Sikkim",
                "name": "Sikkim"
            }, {
                "value": "TamilNadu",
                "name": "TamilNadu"
            }, {
                "value": "Tripura",
                "name": "Tripura"
            }, {
                "value": "Uttar Pradesh East",
                "name": "Uttar Pradesh East"
            }, {
                "value": "Uttar Pradesh West",
                "name": "Uttar Pradesh West"
            }, {
                "value": "Uttrakhand",
                "name": "Uttrakhand"
            }, {
                "value": "West Bengal",
                "name": "West Bengal"
            }]
        };


        $scope.fast = true;
        original = angular.copy($scope.RechargeModel);
        $scope.revert = function() {
            $scope.RechargeModel = angular.copy(original);
            $scope.RechargeForm.MobileForm.$setPristine();
            $scope.RechargeForm.MobileForm.$setUntouched();
            return;
        };


        $scope.MobileRecharge = function(validity) {

            if (validity && $scope.Mobile.Type == 'Top-Up') {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                if ($scope.RechargeModel.circle == null) {
                    $scope.RechargeModel.circle = '';
                }
                RechargeFact.PostMobileRecharge($scope.RechargeModel.type,
                    $scope.RechargeModel.phnumber,
                    $scope.RechargeModel.operator, $scope.RechargeModel.amount,
                    $scope.RechargeModel.accountNo,
                    $scope.RechargeModel.stdCode, $scope.RechargeModel.circle,
                    $scope.RechargeModel.auth).then(
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
                        $ionicLoading.hide();
                        $scope.revert();
                        console.log(errormessage);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: errormessage.data.statusDesc
                        });
                    });

            } else if (validity && $scope.Mobile.Type == 'Special') {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                RechargeFact.PostSpecialRecharge($scope.RechargeModel.type,
                    $scope.RechargeModel.operator,
                    $scope.RechargeModel.phnumber,
                    $scope.RechargeModel.amount,
                    $scope.RechargeModel.accountNo,
                    $scope.RechargeModel.stdCode,
                    $scope.RechargeModel.circle,
                    $scope.RechargeModel.auth).then(
                    function(successresponse) {
                        $ionicLoading.hide();
                        $scope.revert();
                        console.log("success posting");
                        console.log(successresponse);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            template: successresponse.data.statusDesc
                        });
                    },
                    function(errormessage) {
                        $ionicLoading.hide();
                        $scope.revert();
                        console.log(errormessage);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: errormessage.data.statusDesc
                        });

                    });
            } else if (validity && $scope.Mobile.Type == 'Post-Paid') {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                RechargeFact.PostPaidRecharge(
                    $scope.RechargeModel.phnumber,
                    $scope.RechargeModel.operator,
                    $scope.RechargeModel.amount,
                    $scope.RechargeModel.type,
                    $scope.RechargeModel.accountNo,
                    $scope.RechargeModel.stdCode,
                    $scope.RechargeModel.circle,
                    $scope.RechargeModel.auth).then(
                    function(successresponse) {
                        $ionicLoading.hide();
                        $scope.revert();
                        console.log("success posting");
                        console.log(successresponse);
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
            } else {
                $ionicLoading.hide();
                window.plugins.toast.showShortTop('no Internet connectivity detected');

            }
        };

        var domain = "status";

        // function extractDomain(url) {

        //     if (url.indexOf(":///") > -1) {
        //         domain = url.split('/')[2];
        //     } else {
        //         domain = url.split('/')[0];
        //     }
        //     domain = domain.split(':')[0];

        //     console.log(domain);
        // };
        // extractDomain('file:///android_asset/www/index.html#/app/home');
        $scope.Recharge = function(valide) {
            if (valide) {
                $scope.token = store.get('jwt');

                var rechargeObj = JSON.stringify({
                    'mobileNumber': $scope.RechargeModel.phnumber,
                    'operatorCode': $scope.RechargeModel.operator,
                    'amount': $scope.RechargeModel.amount,
                    'stdCode': $scope.RechargeModel.stdCode,
                    'accountNo': $scope.RechargeModel.accountNo,
                    'rechargeType': $scope.RechargeModel.type,
                    'circleCode': $scope.RechargeModel.circle,
                    'auth': $scope.RechargeModel.auth,
                    'operationType': $scope.RechargeModel.Optype,
                    'jwtToken': $scope.token,
                    'redirectUrl': domain

                });
                console.log(rechargeObj);
                var url,ref;
                $http({
                        method: 'POST',
                        url: API + 'api/compressurl.json',
                        contentType: 'application/json',
                        data: rechargeObj
                    })
                    .then(
                        function(success) {
                            var compressed = success.data.compressed.replace(/\+/g, "*");
                            url = API + 'b2cpayoperation.html?request=' + compressed;
                            ref = window.open(url,'_blank', 'location=no,toolbar=no');
                            ref.addEventListener('loadstop', function(event) {
                                if (event.url === 'https://test.payumoney.com/payment/postBackParam.do' || event.url ===  'https://status/#!/status') {
                                 ref.close();
                                  }
                            });
                            // $window.location.href = url;
                        },
                        function(error) {
                            console.log(error);
                            ref = window.open('','_blank', 'location=no,toolbar=no');
                            ref.addEventListener('loadstop', function(event) {ref.close(); });
                        });
                // var url = 'status';
                // var ref = window.open(API  + 'b2cpayoperation.html?mobileNumber=' + $scope.RechargeModel.phnumber + '&operatorCode=' + $scope.RechargeModel.operator +
                //     '&amount=' + $scope.RechargeModel.amount + '&stdCode=' + $scope.RechargeModel.stdCode +
                //     '&accountNo=' + $scope.RechargeModel.accountNo + '&rechargeType=' + $scope.RechargeModel.type +
                //     '&circleCode=' + $scope.RechargeModel.circle + '&auth=' + $scope.RechargeModel.auth + '&operationType=' +
                //     $scope.RechargeModel.Optype + '&redirectUrl=' + url + '&tokenAuth=' + $scope.token, '_blank', 'location=no,toolbar=no');
                // ref.addEventListener('loadstop', function(event) {
                //     if (event.url === 'https://test.payumoney.com/payment/postBackParam.do') { ref.close(); }
                // });
            };

        };

        $scope.$watchGroup(
            ['RechargeModel.operator', 'Mobile.Type'],
            function(currentval, oldval) {
                if ($scope.Mobile.Type == 'Top-Up') {
                    $scope.circlefield = false;
                    $scope.OperatorList = $scope.operator.TopUp;
                } else if ($scope.Mobile.Type == 'Special') {
                    $scope.circlefield = false;
                    $scope.OperatorList = $scope.operator.Special;
                    $scope.RechargeModel.type = 'stv';
                } else if ($scope.Mobile.Type == 'Post-Paid' && $scope.RechargeModel.operator == "BSNL POSTPAID") {
                    $scope.OperatorList = $scope.operator.PostPaid;
                    $scope.circlefield = true;
                    $scope.CircleList = $scope.operator.circle;
                    $scope.RechargeModel.type = 'bill';
                } else {
                    $scope.circlefield = false;
                    $scope.OperatorList = $scope.operator.PostPaid;
                    $scope.CircleList = $scope.operator.circle;
                    $scope.RechargeModel.type = 'bill';
                }
            });
    };

    RechargeCtrl.$inject = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', 'RechargeFact', '$http', 'store', 'API','$window', '$location'];
    angular.module('App').controller('RechargeCtrl', RechargeCtrl);
}());
