var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("LoginCtrl", function($rootScope, $scope, $state, AppmaxxService, $log) {

	$scope.login = function(credentials) {
		AppmaxxService.login(credentials).then(function(response) {
			/* got a response, check for authentication token */
			if (response.data.token) {
				/* got an authentication token, save it */
				AppmaxxService.setUserData(response.data);
				
				// TODO TW Do every inital backend request here: Rooms, Lights, Devices, Scenes?
				
				$state.go('lights');
			} else {
				/* response does not contain authentication token... */
				$rootScope.$broadcast('backend.error', response);
			}
		}, function(response) {
			$rootScope.$broadcast('backend.error', response);
		}).finally(function() {
			 credentials.userId = '';
			 credentials.password = '';
		});
	}

});