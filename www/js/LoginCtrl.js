(function() {
    'use strict';
    var loginController = function($scope, $rootScope, jwtHelper, $http, $state, store, API, $ionicPopup, $ionicLoading, $q, UserService) {


        $scope.Login_Model = {};
        $scope.FogotPassModel = {};
        $scope.hideSocial_loginButton = false;
        
         $scope.admin = "zobipayb2c";
        $scope.login = function(data) {
            $ionicLoading.show({
                templateUrl: "views/app/Modal/loading.html"
            });
            var loginObj = JSON.stringify({
                userAuthToken: data.token,
                name: data.name,
                emailId: data.email,
                authType: data.provider,
                userSocialId: data.userID,
                mobileNumber: data.mobile,
                adminUserName: $scope.admin
            });
            $http({
                url: API + "socialauth.json",
                method: "POST",
                skipAuthorization: true,
                data: loginObj,
                contentType: "application/json",

            }).then(
                function(successResponse) {
                    console.log(successResponse);
                    $rootScope.token = successResponse.data.token;
                    store.set('jwt', $rootScope.token);
                    $ionicLoading.hide();
                    $state.go('app.home');
                },
                function(errorResponse) {
                     $ionicLoading.hide();
                    console.log(errorResponse);
                })
        }
      


        // facebook login

        var fbLoginSuccess = function(response) {
            if (!response.authResponse) {
                fbLoginError("Cannot find the authResponse");
                return;
            }

            var authResponse = response.authResponse;

            getFacebookProfileInfo(authResponse)
                .then(function(profileInfo) {
                    //for the purpose of this example I will store user data on local storage
                    UserService.setfbUser({
                        authResponse: authResponse,
                        token: authResponse.accessToken,
                        userID: profileInfo.id,
                        name: profileInfo.name,
                        email: profileInfo.email,
                        provider: 'facebook',
                        picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
                    });

                    $ionicLoading.hide();
                    $scope.user = UserService.getfbUser('facebook');
                    CheckUserExist();

                }, function(fail) {
                    //fail get profile info
                    console.log('profile info fail', fail);
                });
        };


        //This is the fail callback from the login method
        var fbLoginError = function(error) {
            console.log('fbLoginError', error);
            $ionicLoading.hide();
        };

        //this method is to get the user profile info from the facebook api
        var getFacebookProfileInfo = function(authResponse) {
            var info = $q.defer();

            facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
                function(response) {
                    console.log(response);
                    info.resolve(response);
                },
                function(response) {
                    console.log(response);
                    info.reject(response);
                }
            );
            return info.promise;
        };

        //This method is executed when the user press the "Login with facebook" button
        $scope.facebookSignIn = function() {
              $state.go('app.home');
            facebookConnectPlugin.getLoginStatus(function(success) {
                if (success.status === 'connected') {
                    // the user is logged in and has authenticated your app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed request, and the time the access token
                    // and signed request each expire
                    console.log('getLoginStatus', success.status);

                    //check if we have our user saved
                    $scope.user = UserService.getfbUser('facebook');

                    if (!$scope.user.userID) {
                        getFacebookProfileInfo(success.authResponse)
                            .then(function(profileInfo) {

                                //for the purpose of this example I will store user data on local storage
                                UserService.setfbUser({
                                    authResponse: success.authResponse,
                                    token: success.authResponse.accessToken,
                                    userID: profileInfo.id,
                                    name: profileInfo.name,
                                    email: profileInfo.email,
                                    provider: 'facebook',
                                    picture: "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                                });

                                // $state.go('app.home');

                            }, function(fail) {
                                //fail get profile info
                                console.log('profile info fail', fail);
                            });
                    } else {
                        // $state.go('app.home');
                        CheckUserExist();
                    }

                } else {
                    //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
                    //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
                    console.log('getLoginStatus', success.status);

                    $ionicLoading.show({
                        template: 'Logging in...'
                    });

                    //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                    facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
                }
            });
        };


        // google+ login

        $scope.googleSignIn = function() {
            $ionicLoading.show({
                template: 'Logging in...'
            });

            window.plugins.googleplus.login({
                    // scopes: 'profile email',
                    webClientId: '311053834315-02ahd1783m4nmpldm8smhao3jhdknpd5.apps.googleusercontent.com',
                    offline: false
                },
                function(user_data) {
                    console.log(user_data);
                    alert(user_data);
                    //for the purpose of this example I will store user data on local storage
                    UserService.setgoogleUser({
                        userID: user_data.userId,
                        name: user_data.displayName,
                        email: user_data.email,
                        picture: user_data.imageUrl,
                        accessToken: user_data.accessToken,
                        idToken: user_data.idToken
                    });

                    $ionicLoading.hide();
                    $scope.user = UserService.getGoogleuser();
                    CheckUserExist();
                },
                function(msg) {
                    $ionicLoading.hide();
                    alert(msg);
                    console.log(msg);
                }
            );
        };



        var CheckUserExist = function() {

            var usernamevalidationobj = JSON.stringify({
                'userName': $scope.user.email + $scope.admin,
            });
            console.log(usernamevalidationobj);
            $http({
                method: 'POST',
                url: API + 'api/isusernameexist.json',
                contentType: 'application/json',
                data: usernamevalidationobj,
            }).then(
                function(success) {
                    if (success.data.status) {
                        $scope.login($scope.user);
                    } else {
                        $scope.hideSocial_loginButton = true;
                    }

                },
                function(error) {
                    // $uibModalInstance.close($scope.UserSocialLoginDetails);
                });
        };

        $scope.NewUser = function(valid) {
            if (valid) {
                $scope.user.mobile = $scope.Login_Model.phonenumber;
                $scope.login($scope.user);
            }

        };

        $scope.logout = function() {

            facebookConnectPlugin.logout(function(msg) {
                    console.log(msg);
                    alert(msg);
                },
                function(fail) {
                    console.log(fail);
                    // $ionicLoading.hide();
                });

            // Google logout
                window.plugins.googleplus.logout(
                    function (msg) {
                        console.log(msg);
                    },
                    function(fail){
                        console.log(fail);
                    }
                );

        };

        // $ionicDeploy.check();
    };
    loginController.$inject = ['$scope', '$rootScope', 'jwtHelper', '$http', '$state', 'store', 'API', '$ionicPopup', '$ionicLoading', '$q', 'UserService'];
    angular.module("App").controller('loginController', loginController);

}());
