var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("ScenesCtrl", function($rootScope, $scope, AppmaxxService, $log) {

  	$scope.toggleScene = function(scene) {
		AppmaxxService.toggleScene(scene).then(function(response) {
			  $log.debug('Success toggleSwitch');
		}, function(response) {
			$rootScope.$broadcast('backend.error', response);
		});
  	}
	
});