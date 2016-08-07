var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("ErrorCtrl", [ "$scope", "$log", "$timeout", function($scope, $log, $timeout) {

	$scope.$on('error.message', function(event, value) {
		var errorMessage;
		
		/* build error message from json response */
		if (value && value.data) {
			var response = value.data;
			if (response.message && response.description && response.statusCode) {
				/* got a server side error message */
				errorMessage = response.description + ' (' + response.statusCode + ' ' + response.message + ')';
			}
		}
		
		/* build general error message if we haven't one yet */
		if (!errorMessage) {
			errorMessage = 'An unexpected error occurred: ' + value.status + ' ' + value.statusText
		    	+ '. Please see the browser console for more information: ' + value.data;
		}

		$log.error('Error: ' + errorMessage);
		$scope.errorMessage = errorMessage;

		/* reset error message after 10 seconds */
		$timeout(function() {
			$scope.errorMessage = undefined;
		}, 10000);
	});

} ]);