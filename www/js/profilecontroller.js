(function() {
    'use strict';

    var profileController = function($scope, $http, API, $ionicLoading, $ionicHistory, jwtHelper, store, $window, $state, $ionicPopup) {

        $scope.UserProfile = {};
        $scope.passwordModel = {};
        $scope.ProfileEdit = false;
        var original;
        var getProfile = function() {
            $ionicLoading.show({
                templateUrl: "views/app/Modal/loading.html"
            });
            var profileparms = {};
            profileparms.id = "";
            $http
                .get(API + 'user/getuserprofile.json', {
                    params: profileparms
                })
                .then(
                    function(successresponse) {
                        console.log("success posting");
                        console.log(successresponse);
                        $ionicLoading.hide();
                        original = angular.copy(successresponse.data);
                        $scope.UserProfile.firstName = successresponse.data.firstName;
                        $scope.UserProfile.lastName = successresponse.data.lastName;
                        $scope.UserProfile.mobileNumber = successresponse.data.mobileNumber;
                        $scope.UserProfile.email = successresponse.data.email;
                        $scope.UserProfile.city = successresponse.data.city;
                        $scope.UserProfile.state = successresponse.data.state;
                        $scope.UserProfile.address = successresponse.data.address;
                    },
                    function(errormessage) {
                        $ionicLoading.hide();
                        console.log(errormessage);
                    });
        };
        $scope.cancel = function() {
            $scope.UserProfile.firstName = original.firstName;
            $scope.UserProfile.lastName = original.lastName;
            $scope.UserProfile.mobileNumber = original.mobileNumber;
            $scope.UserProfile.email = original.email;
            $scope.UserProfile.city = original.city;
            $scope.UserProfile.state = original.state;
            $scope.UserProfile.address = original.address;
        };
        $scope.Profile = function() {
            $ionicLoading.show({
                templateUrl: "views/app/Modal/loading.html"
            });
            var profileobj = {
                'firstName': $scope.UserProfile.firstName,
                'lastName': $scope.UserProfile.lastName,
                'mobileNumber': $scope.UserProfile.mobileNumber,
                'email': $scope.UserProfile.email,
                'city': $scope.UserProfile.city,
                'state': $scope.UserProfile.state,
                'address': $scope.UserProfile.address
            };
            $http({
                method: 'POST',
                url: API + 'user/updateprofile.json',
                contentType: 'application/json',
                data: profileobj,
            }).then(
                function(successresponse) {
                    $ionicLoading.hide();
                    console.log(successresponse);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: successresponse.data.statusDesc
                    });
                    getProfile();
                },
                function(errormessage) {
                    $ionicLoading.hide();
                    console.log(errormessage);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: errormessage.data.statusDesc
                    });
                });
        };

        $scope.LogOut = function() {
            store.remove('jwt');
            store.remove('userdata');
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            batch.user.getEditor()
                .setIdentifier(null) // Set to `null` if you want to remove the identifier.
                .save();
            // Facebook logout
            facebookConnectPlugin.logout(function() {
                    // $ionicLoading.hide();
                },
                function(fail) {
                    console.log(fail);
                    // $ionicLoading.hide();
                });
            // $window.location.reload(true);
            $state.go('login', {}, { location: "replace", reload: true });


        };


        $scope.ChangePassword = function() {

            var change_password = $ionicPopup.show({
                template: 'Password<label class="item item-input item-icon-right"><i class="icon ion-eye" on-touch="showPassword = !showPassword"></i><input type="password" ng-model="passwordModel.Password" placeholder="Password" ng-hide="showPassword"><input type="text" ng-model="passwordModel.Password" placeholder="Password" ng-show="showPassword"></label> <br> Confirm Password  <label class="item item-input item-icon-right"><i class="icon ion-eye" on-touch="ConfirmshowPassword = !ConfirmshowPassword"></i><input type="password" ng-model="passwordModel.confirmPassword" placeholder="Password" ng-hide="ConfirmshowPassword"><input type="text" ng-model="passwordModel.confirmPassword" placeholder="Password" ng-show="ConfirmshowPassword"></label> ',
                title: 'Change Password',
                cssClass: 'ChangePassword',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!($scope.passwordModel.Password && $scope.passwordModel.confirmPassword)) {
                            e.preventDefault();
                        } else {
                            return $scope.passwordModel;
                        }
                    }
                }, ]

            });

            change_password.then(function(res) {
                if (res) {
                    if (res.Password == res.confirmPassword) {
                        $ionicLoading.show({
                            templateUrl: "views/app/Modal/loading.html"
                        });
                        var passwordparms = {};
                        passwordparms.password = res.confirmPassword;
                        $http.get(API + 'changepassword.json', {
                            params: passwordparms
                        }).then(function(successresponse) {
                            $ionicLoading.hide();
                            $scope.passwordModel = {};
                            console.log(successresponse);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Success',
                                template: 'Password Change Success..'
                            });
                            // AlertDialogFactory.showAlert("Success!", $scope);
                        }, function(errorresponse) {
                            $ionicLoading.hide();
                            console.log(errorresponse);
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Password not matched'
                        });
                    }

                } else {
                    console.log('Please Enter Password');
                }
            });

        };

        getProfile();

    };
    profileController.$inject = ['$scope', '$http', 'API', '$ionicLoading', '$ionicHistory', 'jwtHelper', 'store', '$window', '$state', '$ionicPopup'];
    angular.module('App').controller('profileController', profileController);
}());
