angular.module('App', ['ionic',
        'starter.controllers',
        'angular-jwt',
        'angular-storage',
        'ngMaterial',
        'ngMessages',
        'ionic-native-transitions',
        'ionic.cloud'
    ])
    .constant('API', 'http://192.168.15.110:8080/')
    .run(function($rootScope, AppFactory, $ionicPlatform, $state, $ionicConfig, $timeout, $ionicPopup, $window, $location, $ionicModal) {
        // , $ionicDeploy
        $rootScope.offline = '';
        var Offlinemodel = null;
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
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

        // function onOnline() {
        //     $rootScope.offline = 'false';
        //     Offlinemodel.remove();
        //     if (!$rootScope.Dashboard) {
        //         $rootScope.$broadcast('DashBoardHit');
        //     } else {
        //         return
        //     }
        // };

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
            } else if (to.name == 'login' && AppFactory.isLoggedIn()) {
                ev.preventDefault();
                $state.go('app.home', {}, { reload: true }, { location: 'replace' });
            }
        });



        // $ionicDeploy.check().then(function(snapshotAvailable) {
        //     if (snapshotAvailable) {
        //         $ionicDeploy.download().then(function() {
        //             $ionicDeploy.extract().then(function() {
        //                 $ionicPopup.show({
        //                     title: 'Update available',
        //                     subTitle: 'An update was just downloaded. Would you like to restart your app to use the latest features?',
        //                     buttons: [
        //                         { text: 'Not now' }, {
        //                             text: 'Restart',
        //                             onTap: function(e) {
        //                                 $ionicDeploy.load();
        //                             }
        //                         }
        //                     ],
        //                 });

        //             });

        //         });

        //     }
        // });



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
    .config(function($stateProvider, $urlRouterProvider, $mdGestureProvider, $ionicConfigProvider, jwtOptionsProvider, $httpProvider, $ionicNativeTransitionsProvider, $ionicCloudProvider) {
        $ionicConfigProvider.views.maxCache(3);
        $mdGestureProvider.skipClickHijack();
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicNativeTransitionsProvider.setDefaultTransition({
            "duration": 10,
            "androiddelay": 50, // Longer delay better for older androids
            // "fixedPixelsTop"    : 64, // looks OK on iOS
        });

        $ionicCloudProvider.init({
            "core": {
                "app_id": "90209a9c"
            },
            "push": {
                "sender_id": "421535327263",
                "pluginConfig": {
                    "ios": {
                        "badge": true,
                        "sound": true
                    },
                    "android": {
                        "iconColor": "#7f5efe"
                    }
                }
            }
        });
        jwtOptionsProvider.config({
            // 192.168.43.123
            // 192.168.15.186
            //192.168.0.6
            //apiserveu.mybluemix.net
            whiteListedDomains: ['iserveu.online', 'apiserveu.mybluemix.net', '192.168.15.110','192.168.15.105'],
            unauthenticatedRedirectPath: '/login',
            authHeader: 'Authorization',
            authPrefix: '',
            tokenGetter: ['store', 'jwtHelper', '$http', 'API', function(store, jwtHelper, $http, API) {
                var jwt = store.get('jwt');
                return jwt;
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
         .state('app.sendmoney', {
                cache: false,
                url: "/sendmoney",
                requireAuth: true,
                views: {
                    'menuContent': {
                        templateUrl: "views/app/pages/sendmoney.html",
                        controller: "sendmoneyController"
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
        });

        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('login');
        });

    });
