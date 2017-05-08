angular.module('starter.controllers', [])
    // APP
    .controller('AppCtrl', function($scope, $window, $ionicHistory, $ionicSideMenuDelegate, $ionicModal, $timeout, $rootScope, AppFactory, store, $state, jwtHelper, $ionicLoading, API, $http, $ionicPopover, $ionicPopup) {
        var UserInfo = function() {
            $ionicLoading.show({
                templateUrl: "views/app/Modal/loading.html"
            });
            AppFactory.GetUserInfo().then(
                function(successResponse) {

                    $ionicLoading.hide();
                    $rootScope.Dashboard = true;
                    console.log(successResponse.data);
                    $scope.User_info = successResponse.data.userInfo;
                    // $rootScope.UserName = successResponse.data.userInfo.firstName;
                    // $rootScope.UserBalance = successResponse.data.userInfo.userBalance;
                    // $rootScope.usertype = successResponse.data.userInfo.userType;
                    // $rootScope.vpa = successResponse.data.userInfo.userVpa;
                    // $rootScope.usermobileNo = successResponse.data.userInfo.userMobileNo;
                    // $rootScope.userVPA = successResponse.data.userInfo.userVpa;


                    $scope.UserName = successResponse.data.userInfo.userName;
                    $rootScope.UserBalance = successResponse.data.userInfo.userBalance;
                    $rootScope.usertype = successResponse.data.userInfo.userType;
                    // $rootScope.mposnumber = successResponse.data.userInfo.mposNumber;
                    $rootScope.userMobileNo = successResponse.data.userInfo.userProfile.mobileNumber;
                    $rootScope.userEmail = successResponse.data.userInfo.userProfile.email;
                    $rootScope.Admin = successResponse.data.userInfo.adminName;
                    $scope.Brand = JSON.parse(String(successResponse.data.userInfo.userBrand));
                    $rootScope.BrandName = $scope.Brand.brand;
                    
                    // batch.user.getEditor()
                    //     .setIdentifier($scope.UserName) // Set to `null` if you want to remove the identifier.
                    //     .save();
                    // if (successResponse.data.userInfo.userVpa == "" || successResponse.data.userInfo.userVpa == "NA") {
                    //     $scope.registration();
                    // }
                    // $rootScope.Admin = successResponse.data.userInfo.adminName;
                    // $scope.Brand = JSON.parse(String(successResponse.data.userInfo.userBrand));
                    // $rootScope.BrandName = $scope.Brand.brand;
                    console.log($scope.UserBalance);
                    store.set('userdata', successResponse.data);
                    $scope.WalletBalance();
                },
                function(errorResponse) {
                    $ionicLoading.hide();
                    console.log(errorResponse);
                    $rootScope.Dashboard = false;
                }
            );
        };
        UserInfo();

        var Obj = JSON.stringify({
            appName: 'merchantApp',
            merchantTxnID: '',
            mid: 'YES0000000000196',
            merchantKey: '3125ead55992537db58311dc09d0fc49'
        });
        $scope.registration = function() {
            window.plugins.intent.UPIReg(Obj, success, failure);
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

        var updatevpa = function(message) {
            var msg = JSON.parse(message);
            var vpaobj = {
                'vpa': msg.virtualAddress
            };

            $http({
                method: 'POST',
                url: API + 'user/updateupiprofile.json',
                contentType: 'application/json',
                data: vpaobj,
            }).then(
                function(successresponse) {
                    console.log(successresponse);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: successresponse.data.statusDesc
                    });
                },
                function(errormessage) {
                    console.log(errormessage);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: errormessage.data.statusDesc
                    });
                });
        };

        $scope.$on('DashBoardHit', function(event, data) {
            UserInfo();
        });


        $scope.WalletBalance = function() {
            var parameters = {};
            $http.get(API + 'user/getuserbalance.json', {
                params: parameters
            }).then(function(successresponse) {
                $rootScope.balance = successresponse.data;
            }, function(errorresponse) {
                console.log(errorresponse);
            });
        };

        // var template = '<ion-popover-view>' +
        //     '   <ion-header-bar>' +
        //     '       <h1 class="title">My Popover Title</h1>' +
        //     '   </ion-header-bar>' +
        //     '   <ion-content class="padding">' +
        //     '       My Popover Contents' +
        //     '   </ion-content>' +
        //     '</ion-popover-view>';

        $ionicPopover.fromTemplateUrl('views/app/Modal/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });


        $scope.isAdmin = function() {
            if ($rootScope.usertype === "ROLE_ADMIN")
                return true;
            else
                return false;
        }
        $scope.isSuperAdmin = function() {
            if ($rootScope.usertype == 'ROLE_SUPER_ADMIN')
                return true;
            else
                return false;
        }

        $scope.isRetailer = function() {
            if ($rootScope.usertype === "ROLE_RETAILER")
                return true;
            else
                return false;
        }

        $scope.isMasterDis = function() {
            if ($rootScope.usertype === "ROLE_MASTER_DISTRIBUTOR")
                return true;
            else
                return false;
        }
        $scope.isDistributor = function() {
            if ($rootScope.usertype === "ROLE_DISTRIBUTOR")
                return true;
            else
                return false;
        }


        $scope.NotificationPage = function() {
            $state.go('app.notification');
        };


        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.isWalletShown = false;
        $scope.toggleWallet = function() {
            $scope.isWalletShown = $scope.isWalletShown === false ? true : false;
        };

        $scope.isTransactionShown = false;

        $scope.toggleTransaction = function() {
            $scope.isTransactionShown = $scope.isTransactionShown === false ? true : false;
        };
        $scope.isBalanceShown = false;
        $scope.toggleBalance = function() {
            $scope.isBalanceShown = $scope.isBalanceShown === false ? true : false;
        };

        $scope.isPaymentShown = false;
        $scope.togglePayment = function() {
            $scope.isPaymentShown = $scope.isPaymentShown === false ? true : false;
        };


        $rootScope.$on("updateBalanceTrx", function(event, args) {
            var parameters = {};
            $http.get(API + 'user/getuserbalance.json', {
                params: parameters
            }).then(
                function(successresponse) {
                    console.log(successresponse);
                    $rootScope.UserBalance = successresponse.data;
                },
                function(errormessage) {
                    console.log(errormessage);
                });
        });

        $scope.$on('$ionicView.enter', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on('$ionicView.leave', function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });

        $scope.$on('cloud:push:notification', function(event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });

        $scope.transactionStatus = function() {

            var TranStsObj = JSON.stringify({
                mid: "YBL000000000001",
                merchantKey: "fdc390bef3ef1ee3d4a7e77fd42238df",
                merchantTxnID: "9132012",
                yblTxnId: "",
                refranceId: ""
            });

            window.plugins.intent.UPITranSt(TranStsObj, TXNsuccess, TXNfailure);

        };

        var TXNsuccess = function(message) {
            alert(message);
            console.log(message);
        };

        var TXNfailure = function(error) {
            console.log(error);
            alert("Error calling Hello Plugin");
        };

        $scope.authorization = function() {
            var AuthObj = JSON.stringify({
                mid: "YBL000000000012",
                merchantKey: "euygwjb787856gutg565ff",
                merchantTxnID: "342332443",
                virtualAddress: "raj@yesb"
            });
            window.plugins.intent.UPIRAuth(AuthObj, AUTHsuccess, AUTHfailure);
        };

        var AUTHsuccess = function(message) {
            alert(message);
            console.log(message);
        };

        var AUTHfailure = function(error) {
            console.log(error);
            alert("Error calling Hello Plugin");
        };

        $scope.setMpin = function() {
            var MPINObj = JSON.stringify({
                mid: "YBL000000000012",
                merchantKey: "euygwjb787856gutg565ff",
                merchantTxnID: "342332443",
                virtualAddress: "raj@yesb"
            });
            window.plugins.intent.UPIMPIN(MPINObj, MPINsuccess, MPINfailure);
        };

        var MPINsuccess = function(message) {
            alert(message);
            console.log(message);
        };

        var MPINfailure = function(error) {
            console.log(error);
            alert("Error calling Hello Plugin");
        };


        $scope.accountManagement = function() {
            var AccmanageObj = JSON.stringify({
                mid: "YBL000000000012",
                merchantKey: "euygwjb787856gutg565ff",
                merchantTxnID: "342332443",
                virtualAddress: "raj@yesb"
            });
            window.plugins.intent.UPIAcc(AccmanageObj, AccMNGsuccess, AccMNGfailure);
        };

        var AccMNGsuccess = function(message) {
            alert(message);
            console.log(message);
        };

        var AccMNGfailure = function(error) {
            console.log(error);
            alert("Error calling Hello Plugin");
        };

        $scope.raiseDisput = function() {
            var RaiseDisObj = JSON.stringify({
                mid: "YBL000000000012",
                merchantKey: "fdc390bef3ef1ee3d4a7e77fd42238df",
                merchantTxnID: "12563",
                trnRefNo: "22252365",
                diputeType: "Dispute1",
                disputeRemark: "Dispute Remarks",

            });
            window.plugins.intent.UPIRaisDis(RaiseDisObj, raiseDisuccess, raiseDifailure);
        };

        var raiseDisuccess = function(message) {
            alert(message);
            console.log(message);
        };

        var raiseDifailure = function(error) {
            console.log(error);
            alert("Error calling Hello Plugin");
        };

    })
    
