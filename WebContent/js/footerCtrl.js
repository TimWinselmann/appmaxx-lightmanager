var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("FooterCtrl", [ "$scope", function($scope) {

	$scope.$on('user-loogin', function(event, value) {
		$scope.value = value;
	});

	$scope.$on('user-logout', function(event, value) {
		$scope.value = undefined;
	});
	
} ]);