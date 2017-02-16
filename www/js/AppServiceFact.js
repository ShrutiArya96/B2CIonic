  (function() {
      'use strict';

      var AppFactory = function($http, API, store, jwtHelper) {
          var AppFact = {};
          AppFact.GetUserInfo = function() {
              var parameters = {};
              return $http({
                  url: API + 'user/dashboard.json',
                  method: "GET",
                  crossDomain: true,
                  skipAuthorization: false,
                  params: parameters,
                  contentType: "application/json;",

              })
          };

          AppFact.isLoggedIn = function() {
              var jwt = store.get('jwt');
              var userdata = store.get('userdata');
              if (jwt && userdata) {
                  return true;
              }
              return false;
          };
          return AppFact;


      };
      AppFactory.$inject = ['$http', 'API', 'store', 'jwtHelper'];
      angular.module("App").factory('AppFactory', AppFactory);
  }());
