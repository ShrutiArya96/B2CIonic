(function() {
    'use strict';
    var forgotPasswordController = function($scope, $state) {


        $scope.recoverPassword = function() {
            $state.go('auth.login');
        };

        $scope.user = {};

    };
    forgotPasswordController.$inject = ['$scope', '$state'];
    angular.module("App").controller('forgotPasswordController', forgotPasswordController);

}());
