var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("ScenesCtrl", [ "$rootScope", "$scope", "AppmaxxService", "$log", function($rootScope, $scope, AppmaxxService, $log) {

	/* private initialization function */
	function init() {
		AppmaxxService.getScenes().then(function(response) {
			$log.info(response.data);
			
			$scope.scenes = response.data;
		}, function(response) {
			$rootScope.$broadcast('error.message', response);
		});
	}
	
	$scope.$on('$stateChangeSuccess', function () {
		init();
	});
	
  	$scope.toggleScene = function(scene) {
		AppmaxxService.toggleScene(scene).then(function(response) {
			  $log.debug('Success toggleSwitch');
		}, function(response) {
			$rootScope.$broadcast('error.message', response);
		});
  	}
	
} ]);