var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("ErrorCtrl", [ "$scope", "$log", "$timeout", function($scope, $log, $timeout) {

	$scope.$on('error.message', function(event, value) {

		var errorMessage;

		if (value && (value.message && value.description && value.statusCode)) {
			errorMessage = value.description + ' (' + value.statusCode + ' ' + value.message + ')';
		} else {
			// TODO handle error without data
			errorMessage = 'An unexpected error occurred: ' + rejection.status;
		}

		$log.debug('Error: ' + errorMessage);

		$scope.errorMessage = errorMessage;

		$timeout(function() {
			$scope.errorMessage = undefined;
		}, 10000);
	});

} ]);