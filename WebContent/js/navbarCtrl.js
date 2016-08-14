var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("NavbarCtrl", [ "$rootScope", "$scope", "$state", "AppmaxxService", "$log", function($rootScope, $scope, $state, AppmaxxService, $log) {

	$state.includes('login')
	
	$scope.logout = function() {
		AppmaxxService.logout();
		
		$rootScope.$broadcast('user-logout');
		$state.go('login');
	}
}]);
