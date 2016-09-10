var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("DevicesCtrl", function($rootScope, $scope, AppmaxxService, $log) {

	/* private initialization function */
	function init() {
		AppmaxxService.getRooms().then(function(response) {
			$log.info(response.data);
			
			$scope.rooms = response.data;
		}, function(response) {
			$rootScope.$broadcast('backend.error', response);
		});
		
		AppmaxxService.getDevices().then(function(response) {
			$log.info(response.data);
			
			$scope.devices = response.data;
		}, function(response) {
			$rootScope.$broadcast('backend.error', response);
		});
	}
	
	$scope.$on('$stateChangeSuccess', function () {
		init();
	});
	
  	$scope.toggleLight = function(light) {
		AppmaxxService.toggleLight(light).then(function(response) {
			  $log.debug('Success toggleSwitch');
		}, function(response) {
			$rootScope.$broadcast('backend.error', response);
		});
  	}
	
});