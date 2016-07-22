var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("FooterCtrl", [ "$scope", function($scope) {

	$scope.$on('login.data', function(event, value) {
		$scope.value = value;
	});

} ]);