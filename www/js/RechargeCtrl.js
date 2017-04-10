(function() {
    'use strict';
    var RechargeCtrl = function($scope, $state, $rootScope, $ionicLoading, $ionicPopup, RechargeFact, $http, $ionicModal, $ionicSlideBoxDelegate, $filter, API,store) {
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
            Optype: 'recharge'
        };

        $scope.operator = {
            "TopUp": [{
                "name": "AIRCEL",
                "value": "AIRCEL",
                "id": "1"
            }, {
                "name": "AIRTEL",
                "value": "AIRTEL",
                "id": "2"
            }, {
                "name": "BSNL",
                "value": "BSNL",
                "id": "3"
            }, {
                "name": "TATA DOCOMO",
                "value": "TATA DOCOMO",
                "id": "5"
            }, {
                "name": "IDEA",
                "value": "IDEA",
                "id": "6"
            }, {
                "name": "TataIndicom",
                "value": "TataIndicom",
                "id": "12"
            }, {
                "name": "MTNL DELHI",
                "value": "MTNL DELHI",
                "id": "9"
            }, {
                "name": "MTNL MUMBAI",
                "value": "MTNL MUMBAI",
                "id": "54"
            }, {
                "name": "MTS",
                "value": "MTS",
                "id": "22"
            }, {
                "name": "RELIANCE GSM",
                "value": "RELIANCE GSM",
                "id": "11"
            }, {
                "name": "TELENOR",
                "value": "TELENOR",
                "id": "13"
            }, {
                "name": "VIDEOCON",
                "value": "VIDEOCON",
                "id": "24"
            }, {
                "name": "VIRGIN CDMA",
                "value": "VIRGIN CDMA",
                "id": "31"
            }, {
                "name": "VIRGIN GSM",
                "value": "VIRGIN GSM",
                "id": "30"
            }, {
                "name": "VODAFONE",
                "value": "VODAFONE",
                "id": "14"
            }, {
                "name": "T24(Flexi)",
                "value": "T24(Flexi)",
                "id": "43"
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
                "value": "AndhraPradesh",
                "id": "1",
                "name": "AndhraPradesh"
            }, {
                "value": "Assam",
                "id": "2",
                "name": "Assam"
            }, {
                "value": "Bihar",
                "id": "3",
                "name": "Bihar"
            }, {
                "value": "Chennai",
                "id": "5",
                "name": "Chennai"
            }, {
                "value": "Delhi",
                "id": "6",
                "name": "Delhi"
            }, {
                "value": "Gujarat",
                "id": "7",
                "name": "Gujarat"
            }, {
                "value": "Haryana",
                "id": "8",
                "name": "Haryana"
            }, {
                "value": "HimachalPradesh",
                "id": "9",
                "name": "HimachalPradesh"
            }, {
                "value": "Karnataka",
                "id": "10",
                "name": "Karnataka"
            }, {
                "value": "Kerala",
                "id": "11",
                "name": "Kerala"
            }, {
                "value": "Kolkata",
                "id": "12",
                "name": "Kolkata"
            }, {
                "value": "MadhyaPradesh",
                "id": "13",
                "name": "Madhya Pradesh"
            }, {
                "value": "Maharashtra",
                "id": "14",
                "name": "Maharashtra"
            }, {
                "value": "Mumbai",
                "id": "15",
                "name": "Mumbai"
            }, {
                "value": "North East",
                "id": "16",
                "name": "North East"
            }, {
                "value": "Orissa",
                "id": "17",
                "name": "Orissa"
            }, {
                "value": "Punjab",
                "id": "18",
                "name": "Punjab"
            }, {
                "value": "Rajasthan",
                "id": "19",
                "name": "Rajasthan"
            }, {
                "value": "TamilNadu",
                "id": "20",
                "name": "TamilNadu"
            }, {
                "value": "Uttar Pradesh East",
                "id": "21",
                "name": "Uttar Pradesh East"
            }, {
                "value": "Uttar Pradesh West",
                "id": "22",
                "name": "Uttar Pradesh West"
            }, {
                "value": "West Bengal",
                "id": "123",
                "name": "West Bengal"
            }, {
                "value": "Uttaranchal",
                "id": "35",
                "name": "Uttaranchal"
            }]

        };

        var domain = "status";
        $rootScope.PaymentOption = 'payu';


        original = angular.copy($scope.RechargeModel);
        $scope.revert = function() {
            $scope.RechargeModel = angular.copy(original);
            $scope.RechargeForm.MobileForm.$setPristine();
            $scope.RechargeForm.MobileForm.$setUntouched();
            return;
        };

        $scope.operatordetect = function() {
            var inputMin = 10;
            if ($scope.RechargeModel.phnumber && ($scope.RechargeModel.phnumber).length == inputMin) {
                $http.get('https://www.freecharge.in/rest/operators/mapping/v3/' + $scope.RechargeModel.phnumber).then(
                    function(success) {
                        console.log(success);
                        $scope.operator_id = success.data.prepaid.operatorId;
                        $scope.circle_id = success.data.prepaid.circleId;
                        if ($scope.operator_id !== null && $scope.circle_id !== null) {
                            var cir = $filter('filter')($scope.operator.circle, { id: $scope.circle_id })[0];
                            $scope.RechargeModel.circle = cir.value;
                            var result = $filter('filter')($scope.operator.TopUp, { id: $scope.operator_id })[0];
                            $scope.RechargeModel.operator = result.value;
                        }

                    },
                    function(error) {
                        console.log(error);

                    });
            }
        };

        $scope.Browse_Plans = function() {
            var cir = $filter('filter')($scope.operator.circle, { value: $scope.RechargeModel.circle })[0];
            var cirid = cir.id;
            var result = $filter('filter')($scope.operator.TopUp, { value: $scope.RechargeModel.operator })[0];
            var opid = result.id;
            $ionicLoading.show({
                templateUrl: "views/app/Modal/loading.html"
            });
            $http.get('https://www.freecharge.in/rds/plans/' + opid + '/' + cirid + '/Mobile/' + $scope.RechargeModel.phnumber).then(
                function(success) {
                    console.log(success);
                    $scope.DisclaimerMessage = success.data.disclaimerMessage;
                    $scope.plans_details = success.data.plansDetails;
                    $scope.recharge_plans = success.data.rechargePlans;
                    $scope.plans_name = [];
                    for (var i = 0; i < $scope.recharge_plans.length; i++) {
                        $scope.plans_name.push($scope.recharge_plans[i].category);
                        var idlen = $scope.recharge_plans[i].planIds.length;
                        for (var j = 0; j < idlen; j++) {
                            var id = $scope.recharge_plans[i].planIds[j];
                            var val = $scope.plans_details[id];
                            $scope.recharge_plans[i].planIds[j] = val;
                        }
                    };
                    $ionicLoading.hide();
                    console.log($scope.recharge_plans);
                    $ionicModal.fromTemplateUrl('views/app/Modal/RechargePlansModal.html', function($ionicModal) {
                        $scope.recharge_Plansmodal = $ionicModal;
                        $scope.recharge_Plansmodal.show();
                    }, {
                        scope: $scope,
                        animation: 'slide-in-down'
                    });
                },
                function(error) {
                    $ionicLoading.hide();
                    console.log(error);

                });

        };
        $scope.selected_price = function(price) {
            $scope.RechargeModel.amount = price;
        };

        $scope.MobileRecharge = function(validity) {
            if (validity && $scope.Mobile.Type == 'Top-Up') {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                // if ($scope.RechargeModel.circle !== null) {
                //     $scope.RechargeModel.circle = '';
                // }

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
        $scope.Recharge = function(valide) {
            if (valide && $rootScope.PaymentOption == 'payu') {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
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
                var url, ref;
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
                            ref = window.open(url, '_blank', 'location=no,toolbar=no');
                            ref.addEventListener('loadstop', function(event) {
                                if (event.url === 'https://test.payumoney.com/payment/postBackParam.do' || event.url === 'https://status/#!/status') {
                                    ref.close();
                                }
                            });
                            $ionicLoading.hide();
                            // $window.location.href = url;
                        },
                        function(error) {
                            $ionicLoading.hide();
                            console.log(error);
                            ref = window.open('', '_blank', 'location=no,toolbar=no');
                            ref.addEventListener('loadstop', function(event) { ref.close(); });
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

            if (valide && $rootScope.PaymentOption == 'juspay') {
                // ExpressCheckout.startCheckoutActivity({
                //             "endUrls": endUrls,
                //             "onEndUrlReached": onEndUrlReached,
                //             "onTransactionAborted": onTransactionAborted,
                //             "environment": "PRODUCTION", // can be either of "SANDBOX" or "PRODUCTION"
                //             "parameters": {
                //                 "orderId": orderId,
                //                 "merchantId": merchantId,
                //             },
                //              "instruments": ["CARD", "NB", "WALLET"]
                //         });
                //  $ionicLoading.show({
                //     templateUrl: "views/app/Modal/loading.html"
                // });
                // var orderId = "1146561";
                var merchantId = "dillip";
                var onEndUrlReached = function() {
                    // your code to check the server status
                    var paymentStatus = getPaymentStatusFromServer();
                    if (paymentStatus == "CHARGED") {
                        gotoThankYouPage();
                    } else {
                        gotoFailurePage();
                    }
                };

                var gotoThankYouPage = function() {
                    console.log('ThankYouPage');
                };

                var gotoFailurePage = function() {
                    console.log('FailurePage');
                };

                var abortedCallback = function() {
                    gotoFailurePage();
                };
                var onTransactionAborted = function() {
                    console.log('TransactionAborted');
                };
               var endUrls = ["http://iserveu.in/*"];

                var rechargeObj = JSON.stringify({
                    'fName': $rootScope.UserName,
                    'userMob': $rootScope.usermobileNo,
                    'mobNo': $scope.RechargeModel.phnumber,
                    'opCode': $scope.RechargeModel.operator,
                    'amount': $scope.RechargeModel.amount,
                    'std': $scope.RechargeModel.stdCode,
                    'accNo': $scope.RechargeModel.accountNo,
                    'rType': $scope.RechargeModel.type,
                    'circle': $scope.RechargeModel.circle,
                    'auth': $scope.RechargeModel.auth,
                    'opType': $scope.RechargeModel.Optype,
                    'rUr': domain,
                    'payOpt': $rootScope.PaymentOption,
                    'bVAddr': $rootScope.userVPA
                });

                $http({
                    method: 'POST',
                    url: API + 'initiatetxforb2coperation.json',
                    contentType: 'application/json',
                    data: rechargeObj
                }).then(
                    function(success) {
                        alert(success);
                        var OrderId = success.data.transactionId;
                        $ionicLoading.hide();
                        ExpressCheckout.startCheckoutActivity({
                            "endUrls": endUrls,
                            "onEndUrlReached": onEndUrlReached,
                            "onTransactionAborted": onTransactionAborted,
                            "environment": "PRODUCTION", // can be either of "SANDBOX" or "PRODUCTION"
                            "parameters": {
                                "orderId": OrderId,
                                "merchantId": merchantId,
                            },
                            "instruments": ["CARD", "NB", "WALLET"]
                        });
                    },
                    function(error) {
                        $ionicLoading.hide();
                        alert(error);
                    })
            }

        };

        $scope.UpiRecharge = function(valide) {
            $rootScope.PaymentOption = 'upipay';
            if (valide) {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                var rechargeObj = JSON.stringify({
                    'fName': $rootScope.UserName,
                    'userMob': $rootScope.usermobileNo,
                    'mobNo': $scope.RechargeModel.phnumber,
                    'opCode': $scope.RechargeModel.operator,
                    'amount': $scope.RechargeModel.amount,
                    'std': $scope.RechargeModel.stdCode,
                    'accNo': $scope.RechargeModel.accountNo,
                    'rType': $scope.RechargeModel.type,
                    'circle': $scope.RechargeModel.circle,
                    'auth': $scope.RechargeModel.auth,
                    'opType': $scope.RechargeModel.Optype,
                    'rUrl': domain,
                    'payOpt': $rootScope.PaymentOption,
                    'bVAddr': $rootScope.userVPA
                });

                $http({
                    method: 'POST',
                    url: API + 'initiatetxforb2coperation.json',
                    contentType: 'application/json',
                    data: rechargeObj
                }).then(
                    function(success) {
                        $ionicLoading.hide();
                        console.log(success);
                        var TxId = success.data.transactionId;
                        var UPIRechargeTxnObj = JSON.stringify({
                            // appName: "merchantApp",
                            // merchantTxnID: TxId,
                            // mid: "YES0000000000196",
                            // merchantKey: "3125ead55992537db58311dc09d0fc49",
                            // transactionDesc: "Test Payment",
                            // currency: "INR",
                            // paymentType: "P2M",
                            // transacionType: "PAY",
                            // merchantCatCode: "6102",
                            // amount: $scope.RechargeModel.amount,
                            // payerPaymentAddress: $rootScope.userVPA

                             mid: "YES0000000000196",
                            merchantKey: "3125ead55992537db58311dc09d0fc49",
                            merchantTxnID: TxId,
                            transactionDesc: "Test Payment",
                            currency: "INR",
                            appName: "merchantApp",
                            paymentType: "P2M",
                            transacionType: "PAY",
                            payeePayAddress: "NA",
                            payeeAccntNo: "NA",
                            payeeIFSC: "NA",
                            payeeAadhaarNo: "NA",
                            payeeMobileNo: "NA",
                            merchantCatCode: "6102",
                            expiryTime: "NA",
                            payerIFSC: "NA",
                            payerAadhaarNo: "NA",
                            payerMobileNo: "NA",
                            payerPaymentAddress: $rootScope.userVPA,
                            subMerchantID: "NA",
                            whitelistedAccnts: "NA",
                            payerMMID: "NA",
                            payeeMMID: "NA",
                            refurl: "NA",
                            amount: $scope.RechargeModel.amount.toFixed(2).toString(),

                        });
                        window.plugins.intent.UPITran(UPIRechargeTxnObj, SuccessCall, failure);
                    },
                    function(error) {
                        $ionicLoading.hide();
                        var UPIRechargeTxnObj = JSON.stringify({
                            mid: "YES0000000000196",
                            merchantKey: "3125ead55992537db58311dc09d0fc49",
                            merchantTxnID: "1234567",
                            transactionDesc: "Test Payment",
                            currency: "INR",
                            appName: "merchantApp",
                            paymentType: "P2M",
                            transacionType: "PAY",
                            payeePayAddress: "",
                            payeeAccntNo: "",
                            payeeIFSC: "",
                            payeeAadhaarNo: "",
                            payeeMobileNo: "",
                            merchantCatCode: "6102",
                            expiryTime: "",
                            payerIFSC: "",
                            payerAadhaarNo: "",
                            payerMobileNo: "",
                            payerPaymentAddress: "dillip123@yesb",
                            subMerchantID: "",
                            whitelistedAccnts: "",
                            payerMMID: "",
                            payeeMMID: "",
                            refurl: "",
                            amount: "1.00",
                        });
                        window.plugins.intent.UPITran(UPIRechargeTxnObj, SuccessCall, failure);
                        console.log(error);
                    });
            }
        };
        var SuccessCall = function(message) {
            alert(message);
            console.log(message);
        }

        var failure = function(error) {
            console.log(error);
            alert("Error calling Hello Plugin");
        }
        $scope.$watchGroup(
            ['RechargeModel.operator', 'Mobile.Type'],
            function(currentval, oldval) {
                if ($scope.Mobile.Type == 'Top-Up') {
                    $scope.circlefield = false;
                    $scope.CircleList = $scope.operator.circle;
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

    RechargeCtrl.$inject = ['$scope', '$state', '$rootScope', '$ionicLoading', '$ionicPopup', 'RechargeFact', '$http', '$ionicModal', '$ionicSlideBoxDelegate', '$filter', 'API','store'];
    angular.module('App').controller('RechargeCtrl', RechargeCtrl);
}());
