var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("HeaderCtrl", [ "$scope", "$http", "AppmaxxService", function($scope, $http, AppmaxxService) {

	$scope.$on('login.data', function(event, value) {
		$scope.value = value;
	});

} ]);