angular.module('App', ['ionic',
        'starter.controllers',
        'angular-jwt',
        'angular-storage',
        'ngMaterial',
        'ngMessages',
        'ionic-native-transitions',
        'tabSlideBox'
    ])
    .constant('API', 'https://iserveu.online/')
    .run(function($rootScope, AppFactory, $ionicPlatform, $state, $ionicConfig, $timeout, $ionicPopup, $window, $location, $ionicModal) {
        // , $ionicDeploy
        $rootScope.offline = '';
        var Offlinemodel = null;
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)


            // batch.push.registerForRemoteNotifications();
            // batch.setConfig({ "androidAPIKey": "DEV58B2AC37EE71B59C5B8F73A822A" }); // dev
            // // batch.setConfig({"androidAPIKey":"58B2AC37EE3063CA85FFED05EEA5BD"}); // live
            // batch.push.setGCMSenderID("957384237716").setup();
            // batch.start();
            // batch.push.registerForRemoteNotifications();
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.backgroundColorByHexString('#2b47e4');
            }
            var backbutton = 0;
            $ionicPlatform.registerBackButtonAction(function(event) {
                if ($state.current.name == "app.home" || $state.current.name == "login") {
                    if (backbutton == 0 && $state.current.name == "app.home") {
                        backbutton++;
                        window.plugins.toast.showShortBottom('Press again to exit');
                        $timeout(function() { backbutton = 0; }, 3000);
                    } else {
                        navigator.app.exitApp();
                    }
                } else {
                    navigator.app.backHistory();
                }
            }, 100);



            if (window.Connection) {
                if ((navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) && $rootScope.offline == "") {
                    window.plugins.toast.show('no Internet connectivity detected', '3000', 'top');
                    $ionicModal.fromTemplateUrl('views/app/Modal/offlineModal.html', function($ionicModal) {
                        Offlinemodel = $ionicModal;
                        Offlinemodel.show();
                    }, {
                        scope: $rootScope,
                        animation: 'slide-in-up',
                        hardwareBackButtonClose: false
                    });
                }
            };


            document.addEventListener("offline", onOffline, false);

            function onOffline() {
                var networkState = navigator.connection.type;

                if ((networkState == Connection.NONE || networkState == Connection.UNKNOWN) && $rootScope.offline !== "") {
                    window.plugins.toast.show('no Internet connectivity detected', '3000', 'top');
                    $ionicModal.fromTemplateUrl('views/app/Modal/offlineModal.html', function($ionicModal) {
                        Offlinemodel = $ionicModal;
                        Offlinemodel.show();
                    }, {
                        scope: $rootScope,
                        animation: 'slide-in-up',
                        hardwareBackButtonClose: false
                    });
                }
            };

        });

        document.addEventListener("online", onOnline, false);

        function onOnline() {
            $rootScope.offline = 'false';

            if (!$rootScope.Dashboard) {
                if (Offlinemodel) {
                    Offlinemodel.remove();
                    $rootScope.$broadcast('DashBoardHit');
                } else { $rootScope.$broadcast('DashBoardHit'); }

            } else if (Offlinemodel) {
                Offlinemodel.remove();
            }
        };

        // document.addEventListener('batchPushReceived', function(e) {
        //     var pushPayload = e.payload;
        //     alert(pushPayload);
        //     console.log(pushPayload);
        //     // Process the payload as you wish here
        // }, false);

        $rootScope.GotoSetting = function() {
            cordova.plugins.settings.openSetting("settings", function() {
                    console.log("opened  settings")
                        // $window.location.reload(true);
                },
                function() {
                    console.log("failed to open  settings");

                });
        };


        $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {
            if (to.requireAuth && !AppFactory.isLoggedIn()) {
                $state.go('login', {}, { reload: true });
            } else if ((to.name == 'login' || to.name == 'startingpage') && AppFactory.isLoggedIn()) {
                ev.preventDefault();
                $state.go('app.home', {}, { reload: true }, { location: 'replace' });
            }
        });


    })

.service('UserService', function() {

        //for the purpose of this example I will store user data on ionic local storage but you should save it on a database

        var setfbUser = function(user_data) {
            window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        };
        var setgoogleUser = function(user_data) {
            window.localStorage.starter_google_user = JSON.stringify(user_data);
        };
        var getfbUser = function() {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };
        var getGoogleuser = function() {
            return JSON.parse(window.localStorage.starter_google_user || '{}');
        };

        return {
            setfbUser: setfbUser,
            getfbUser: getfbUser,
            setgoogleUser: setgoogleUser,
            getGoogleuser: getGoogleuser

        };
    })
    .config(function($stateProvider, $urlRouterProvider, $mdGestureProvider, $ionicConfigProvider, jwtOptionsProvider, $httpProvider, $ionicNativeTransitionsProvider) {
        $ionicConfigProvider.views.maxCache(3);
        $mdGestureProvider.skipClickHijack();
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicNativeTransitionsProvider.setDefaultTransition({
            "duration": 10,
            "androiddelay": 50, // Longer delay better for older androids
            // "fixedPixelsTop"    : 64, // looks OK on iOS
        });


        jwtOptionsProvider.config({
            // 192.168.43.123
            // 192.168.15.186
            //192.168.0.6
            //apiserveu.mybluemix.net
            whiteListedDomains: ['iserveu.online', 'apiserveu.mybluemix.net', '192.168.15.110', '192.168.15.105', 'staging.iserveu.online'],
            unauthenticatedRedirectPath: '/login',
            authHeader: 'Authorization',
            authPrefix: '',
            tokenGetter: ['store', 'jwtHelper', '$http', 'API', '$filter', '$state', '$window', '$location', function(store, jwtHelper, $http, API, $filter, $state, $window, $location) {
                var jwt = store.get('jwt');
                // return jwt;
                if (jwt) {
                    var decoded = jwtHelper.decodeToken(jwt);
                    var currentTime = $filter('date')(new Date(),
                        'MM dd yyyy - HH:mm:ss');
                    var exptime = $filter('date')(new Date(decoded.exp * 1000),
                        'MM dd yyyy - HH:mm:ss');
                    var diff = Math.abs(new Date(currentTime.split('-')) - new Date(exptime.split('-')));
                    var minutes = Math.floor((diff / 1000) / 60);
                    // console.log(minutes);
                    if (minutes <= 10 && !jwtHelper.isTokenExpired(jwt)) {

                        $http({
                            url: API + 'logintokenrefresh.json',
                            skipAuthorization: true,
                            method: 'POST',
                            headers: { Authorization: jwt },
                        }).then(function(response) {
                            // console.log(response);
                            store.set('jwt', response.data.token);
                            return response.data.token;
                        }, function(response) {
                            console.log(response);
                            store.remove('jwt');
                        });
                    } else if (jwtHelper.isTokenExpired(jwt)) {
                        store.remove('jwt');
                        store.remove('userdata');
                        $state.go('login', {}, { reload: true });
                        // $window.location.reload(true);
                    } else {
                        return jwt;
                    }
                }
            }]
        });


        $httpProvider.interceptors.push('jwtInterceptor');


        $stateProvider
            .state('login', {
                cache: false,
                url: '/login',
                templateUrl: "views/auth/login.html",
                controller: 'loginController',
                requireAuth: false
            })

        .state('forgot-password', {
            cache: false,
            url: "/forgot-password",
            templateUrl: "views/auth/forgot-password.html",
            controller: 'forgotPasswordController'
        })

        .state('app', {
            cache: false,
            url: "/app",
            abstract: true,
            templateUrl: "views/app/side-menu.html",
            controller: 'AppCtrl'
        })

        .state('app.home', {
                cache: false,
                url: "/home",
                requireAuth: true,
                views: {
                    'menuContent': {
                        templateUrl: "views/app/pages/home.html"
                    }
                }
            })
            .state('app.mobile', {
                cache: false,
                url: "/Mobile",
                nativeTransitionsAndroid: {
                    "type": "slide",
                    "direction": "left"
                },
                requireAuth: true,
                views: {
                    'menuContent': {
                        templateUrl: "views/app/pages/Mobile.html",
                        controller: 'RechargeCtrl'
                    }
                }
            })
            .state('app.dth', {
                cache: false,
                url: "/Dth",
                nativeTransitionsAndroid: {
                    "type": "slide",
                    "direction": "left"
                },
                requireAuth: true,
                views: {
                    'menuContent': {
                        templateUrl: "views/app/pages/Dth.html",
                        controller: 'dthRechargeCtrl'
                    }
                }
            })
            .state('app.electricity', {
                cache: false,
                nativeTransitionsAndroid: {
                    "type": "slide",
                    "direction": "left"
                },
                url: "/Electricity",
                requireAuth: true,
                views: {
                    'menuContent': {
                        templateUrl: "views/app/pages/Electricity.html",
                        controller: 'electricityBillPayCtrl'
                    }
                }
            })
            .state('app.datacard', {
                cache: false,
                url: "/Datacard",
                nativeTransitionsAndroid: {
                    "type": "slide",
                    "direction": "left"
                },
                requireAuth: true,
                views: {
                    'menuContent': {
                        templateUrl: "views/app/pages/Datacard.html",
                        controller: 'datacardRechargeCtrl'
                    }
                }
            })
            .state('app.gas', {
                cache: false,
                url: "/Gas",
                nativeTransitionsAndroid: {
                    "type": "slide",
                    "direction": "left"
                },
                requireAuth: true,
                views: {
                    'menuContent': {
                        templateUrl: "views/app/pages/Gas.html",
                        controller: 'gasPaybillCtrl'
                    }
                }
            })

        .state('app.insurance', {
            cache: false,
            url: "/Insurance",
            nativeTransitionsAndroid: {
                "type": "slide",
                "direction": "left"
            },
            requireAuth: true,
            views: {
                'menuContent': {
                    templateUrl: "views/app/pages/Insurance.html",
                    controller: 'insuranceBillPayCtrl'
                }
            }
        })


        .state('app.rechargereport', {
            url: '/RechargeReport',
            requireAuth: true,
            nativeTransitionsAndroid: {
                "type": "slide",
                "direction": "left"
            },
            views: {
                'menuContent': {
                    templateUrl: 'views/app/pages/Recharge_Report.html',
                    controller: 'rechargeReportController'
                }
            }
        })


        .state('app.rechargeDetails', {
            url: '/RCDetails',
            requireAuth: true,
            nativeTransitionsAndroid: {
                "type": "slide",
                "direction": "left"
            },
            views: {
                'menuContent': {
                    templateUrl: 'views/app/pages/Recharge_Details.html',
                    controller: 'RechargeDetailscontroller'
                }
            }
        })

        .state('app.profile', {
            cache: false,
            url: "/profile",
            requireAuth: true,
            nativeTransitionsAndroid: {
                "type": "slide",
                "direction": "left"
            },
            views: {
                'menuContent': {
                    templateUrl: "views/app/profile.html",
                    controller: 'profileController'
                }
            }
        })

        .state('app.notifications',{
            cache:false,
            url:"/notifications",
            requireAuth:true,
            nativeTransitionsAndroid:{
                 "type": "slide",
                "direction": "left"
            },
            views: {
                'menuContent': {
                    templateUrl: "views/app/pages/notifications.html"
                    
                }
            }
        });
            

        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('login');
        });

    });
