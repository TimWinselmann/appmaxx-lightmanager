var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("DevicesCtrl", [ "$rootScope", "$scope", "AppmaxxService", "$log", function($rootScope, $scope, AppmaxxService, $log) {

	/* private initialization function */
	function init() {
		AppmaxxService.getRooms().then(function(response) {
			$log.info(response.data);
			
			$scope.rooms = response.data;
		}, function(response) {
			$rootScope.$broadcast('error.message', response);
		});
		
		AppmaxxService.getDevices().then(function(response) {
			$log.info(response.data);
			
			$scope.devices = response.data;
		}, function(response) {
			$rootScope.$broadcast('error.message', response);
		});
	}
	
	$scope.$on('$stateChangeSuccess', function () {
		init();
	});
	
  	$scope.toggleLight = function(light) {
		AppmaxxService.toggleLight(light).then(function(response) {
			  $log.debug('Success toggleSwitch');
		}, function(response) {
			$rootScope.$broadcast('error.message', response);
		});
  	}
	
} ]);