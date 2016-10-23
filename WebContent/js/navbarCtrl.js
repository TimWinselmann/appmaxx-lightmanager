var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("NavbarCtrl", function($rootScope, $scope, $state, AppmaxxService, $log) {

	$scope.$state = $state;
	
	$scope.logout = function() {
		AppmaxxService.logout();
		
		$rootScope.$broadcast('user-logout');
		$state.go('login');
	}
	
	$scope.$on('cfpLoadingBar:started', function(event, value) {
		$log.debug('loading');
		$scope.loading = true;
	});
	
	$scope.$on('cfpLoadingBar:completed', function(event, value) {
		$log.debug('loading done');
		$scope.loading = false;
	});
});
