var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("DevicesCtrl", function($rootScope, $scope, AppmaxxService, $log) {

  	$scope.toggleLight = function(light) {
		AppmaxxService.toggleLight(light).then(function(response) {
			  $log.debug('Success toggleSwitch');
		}, function(response) {
			$rootScope.$broadcast('backend.error', response);
		});
  	}
	
});