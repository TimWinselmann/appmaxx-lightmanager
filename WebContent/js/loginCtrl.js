var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("LoginCtrl", [ "$rootScope", "$scope", "$state", "AppmaxxService", "$log", function($rootScope, $scope, $state, AppmaxxService, $log) {

	$scope.login = function(credentials) {
		AppmaxxService.login(credentials).then(function(response) {
			/* got a response, check for authentication token */
			if (response.data.token) {
				/* got an authentication token, save it */
				AppmaxxService.setUserData(response.data);
				
				$state.go('lights');
			} else {
				/* response does not contain authentication token... */
				$rootScope.$broadcast('error.message', response);
			}
		}, function(response) {
			$rootScope.$broadcast('error.message', response);
		}).finally(function() {
			 credentials.userId = '';
			 credentials.password = '';
		});
	}

} ]);