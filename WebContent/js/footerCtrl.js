var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("FooterCtrl", [ "$scope", "$scope", function($rootScope, $scope) {

	$scope.userData = $rootScope.globals;
	
} ]);