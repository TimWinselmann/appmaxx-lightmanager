var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("LoginCtrl", [ "$scope", "$http", "AppmaxxService", function($scope, $http, AppmaxxService) {

	$scope.login = function(credentials) {
		AppmaxxService.login(credentials);
	}

} ]);