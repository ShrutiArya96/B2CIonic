(function() {
    'use strict';
    var rechargeReportController = function($scope, $rootScope, $http, $state, API, $ionicLoading, Rechargedetails, $ionicPopup, $ionicPlatform, $ionicScrollDelegate, $timeout) {
        $scope.RechargeReportList = false;
        $scope.RechargeModel = {};
        $scope.searchbar = true;
        $scope.recButton = false;
        $scope.searchbartoggle = function() {
            $scope.searchbar = !$scope.searchbar;
            $scope.search = '';
        };
        // $scope.RechargeModel.FromDate = '';
        var DateToString = function(date) {
            // return moment(date).format('YYYY-MM-DD');
            if (date != null) {
                var month = '' + (date.getMonth() + 1);
                var day = '' + date.getDate();
                var year = date.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [year, month, day].join('-');
            } else {
                return "";
            }
        };

        $scope.scrollToTop = function() { //ng-click for back to top button
            $ionicScrollDelegate.scrollTop();
            $scope.recButton = false; //hide the button when reached top
        };

        $scope.getScrollPosition = function() {
            //monitor the scroll
            var moveData = $ionicScrollDelegate.$getByHandle('recharge').getScrollPosition().top;
            // console.log(moveData);
            $scope.$apply(function() {
                if (moveData > 100) {
                    $scope.recButton = true;
                } else {
                    $scope.recButton = false;
                }
            }); //apply 
        };

        var rechargeReortLoading = $ionicPlatform.registerBackButtonAction(
            function() {
                $ionicLoading.hide();
                navigator.app.backHistory();
            }, 501
        );
        $scope.$on('$destroy', rechargeReortLoading);

        $scope.todaysDate = new Date();
        $scope.minDate = new Date($scope.todaysDate.getFullYear(),
            $scope.todaysDate.getMonth() - 3, $scope.todaysDate.getDate());
        $scope.maxDate = new Date($scope.todaysDate.getFullYear(),
            $scope.todaysDate.getMonth(), $scope.todaysDate.getDate());

        $scope.clearSearch = function() {
            $scope.search = '';
        };

        $scope.RechargeReport = function() {
            if ($scope.RechargeModel.FromDate !== null && $scope.RechargeModel.ToDate !== null) {
                $ionicLoading.show({
                    templateUrl: "views/app/Modal/loading.html"
                });
                var from_Date = DateToString($scope.RechargeModel.FromDate);
                var to_Date = DateToString(new Date($scope.RechargeModel.ToDate
                    .getFullYear(), $scope.RechargeModel.ToDate.getMonth(),
                    $scope.RechargeModel.ToDate.getDate() + 1));

                var RechargeObj = JSON.stringify({
                    'transactionType': "RECHARGE",
                    'fromDate': from_Date,
                    'toDate': to_Date
                });
                $http({
                    method: 'POST',
                    url: API + 'transactiondetails.json',
                    contentType: 'application/json',
                    data: RechargeObj,
                }).then(
                    function(successresponse) {
                        $ionicLoading.hide();
                        if (successresponse.data.transactionReports.length <= 0 && $state.current.name == 'app.rechargereport') {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Response',
                                template: "No Data Found"
                            });
                        } else {
                            $scope.RechargeReportList = true;
                            $scope.RechargeList = successresponse.data.transactionReports;

                            $scope.total_records = $scope.RechargeList;
                            $scope.records = $scope.total_records.slice(0, showitems);
                            $scope.noMoreItemsAvailable = false;
                            console.log($scope.RechargeList);
                        }
                    },
                    function(errormessage) {
                        $ionicLoading.hide();
                        console.log(errormessage);
                    });
            }

        };
        $scope.RechargeModel.ToDate = new Date();
        $scope.RechargeModel.FromDate = new Date();
        $scope.RechargeReport();

        var showitems = 20;
        var counter = showitems;
        $scope.loadMore = function() {
            $timeout(function() {
                var next = $scope.total_records.slice(counter, counter + showitems);
                $scope.records = $scope.records.concat(next);
                counter = counter + showitems;
                if (counter >= $scope.total_records.length) {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 2000)
        };

        $scope.raise_ticket = {};
        $scope.RaiseTicket = function(raise_data) {
            $scope.ID = raise_data.id;
            var RaiseTicketPopup = $ionicPopup.show({
                templateUrl: "views/app/Modal/RaiseTicketModal.html",
                title: 'Raise Ticket',
                scope: $scope,
                 buttons: [{
                    text: 'Cancel',
                    type: 'button-assertive',
                    onTap: function(e) {
                       $scope.raise_ticket.comment = '';
                    }
                }, {
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.raise_ticket.comment) {
                            e.preventDefault();
                        } else {
                            return $scope.raise_ticket;
                        }
                    }
                }, ]

            });
            RaiseTicketPopup.then(function(res) {
                if (res) {
                    var parameters = JSON.stringify({
                        'id': $scope.ID,
                        'comment': res.comment
                    });
                    $http({
                        method: 'POST',
                        url: API + 'user/raiserefundrequests.json',
                        contentType: 'application/json',
                        data: parameters,
                    }).then(
                        function(success) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Response',
                                template: success.data.statusDesc
                            });
                        },
                        function(error) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Response',
                                template: error.data.statusDesc
                            });
                        });

                } else {
                    console.log('Cancel');
                }

            });
        };

        // $scope.showFilterBar = function() {
        //     console.log($scope.records);
        //     var filterBar = $ionicFilterBar.show({
        //         items: $scope.records,
        //         update: function(filteredItems) {
        //             $scope.records = filteredItems
        //         },
        //         expression: function(filterText, value, index, array) {
        //                 return value.amountTransacted == filterText ||
        //                     value.balanceAmount == filterText ||
        //                     value.id == filterText ||
        //                     value.mobileNumber == filterText ||
        //                     value.operatorDescription == filterText ||
        //                     value.operatorTransactionId == filterText ||
        //                     value.previousAmount == filterText ||
        //                     value.referenceNumber == filterText ||
        //                     value.status == filterText ||
        //                     value.transactionType == filterText ||
        //                     value.updatedDate == filterText ||
        //                     value.userName == filterText ||
        //                     value.userTrackId == filterText;
        //             }
        //             //,filterProperties: ['amountTransacted', 'balanceAmount','id','mobileNumber','operatorDescription','operatorTransactionId','previousAmount','referenceNumber','status','transactionType','updatedDate','userName','userTrackId']
        //     });
        // }

        $scope.Images = {

            "AIRCEL:Rr": "img/aircel.jpg",
            "AIRCEL:bill": "img/aircel.jpg",
            "LOOP:Rr": "img/loop.jpg",
            "LOOP:bill": "img/loop.jpg",
            "MTNL:Rr": "img/mtnl.png",
            "MTNL:bill": "img/mtnl.png",
            "MTNL VALIDITY:stv": "img/mtnl.png",
            "MTNL Delhi LandLine": "img/mtnl.png",
            "MTS:Rr": "img/mts.png",
            "MTS:bill": "img/mts.png",
            "RELIANCE:Rr": "img/reliance.jpg",
            "RELIANCE:bill": "img/reliance.jpg",
            "VIRGIN:Rr": "img/virgin.png",
            "TataIndicom:Rr": "img/tataindicom.png",
            "AIRTEL:Rr": "img/airtel.jpg",
            "AIRTEL LANDLINE:bill": "img/airtel.jpg",
            "RELIANCE GSM:Rr": "img/reliance.png",
            "T24:Rr": "img/T24_Logo-300x209.png",
            "BSNL:Rr": "img/bsnl.png",
            "BSNL VALIDITY:stv": "img/bsnl.png",
            "TATA DOCOMO:Rr": "img/docomo.png",
            "TATA DOCOMO:stv": "img/docomo.png",
            "VODAFONE:Rr": "img/vodafone.jpg",
            "VODAFONE:bill": "img/vodafone.jpg",
            "IDEA:Rr": "img/idea.png",
            "IDEA:bill": "img/idea.png",
            "VIDEOCON:Rr": "img/videocon.jpg",
            "TELENOR:Rr": "img/telenor.jpg",
            "BIGTV DTH:dth": "img/BIG_TV_Logo.jpg",
            "TATASKY:dth": "img/TATASKYDTH.jpg",
            "SUN DIRECT:dth": "img/sun-direct.jpg",
            "DISH TV:dth": "img/dish-tv-online-recharge.jpg",
            "VIDEOCON:dth": "img/Videocon-d2h.jpg",
            "AIRTEL:dth": "img/airtel-dth-recharge.png"



        };
        $scope.recharge_details = function(recharge_Data) {
            Rechargedetails.setRechargeData(recharge_Data);
            $state.go('app.rechargeDetails');
        };
    };

    rechargeReportController.$inject = ['$scope', '$rootScope', '$http', '$state', 'API', '$ionicLoading', 'Rechargedetails', '$ionicPopup', '$ionicPlatform', '$ionicScrollDelegate', '$timeout'];
    angular.module("App").controller('rechargeReportController', rechargeReportController);

}());
