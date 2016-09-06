var lightmanager = angular.module('lightmanagerApp');

lightmanager.controller("SwipeCtrl", [ "$scope", "$state", "$log", function($scope, $state, $log) {

	var stateArray = [ 'lights', 'devices', 'motors', 'scenes' ];
	
	$scope.swipeLeft = function () {
		var nextStateName = getNextState($state.$current.self.name);
		$state.go(nextStateName);
		
		$('.navbar-collapse.in').collapse('hide');
	}
	
	$scope.swipeRight = function () {
		var previousStateName = getPreviousState($state.$current.self.name);
		$state.go(previousStateName);
		
		$('.navbar-collapse.in').collapse('hide');
	}
	
	function getPreviousState(currentStateName) {
		var nextIndex = stateArray.indexOf(currentStateName) - 1;
		
		if (nextIndex < 0) {
			nextIndex = stateArray.length - 1;
		}
		
		$log.debug(stateArray[nextIndex]);
		return stateArray[nextIndex];
	}
	
	function getNextState(currentStateName) {
		var nextIndex = stateArray.indexOf(currentStateName) + 1;
		
		if (nextIndex >= stateArray.length) {
			nextIndex = 0;
		}
		
		$log.debug(stateArray[nextIndex]);
		return stateArray[nextIndex];
	}
		
} ]);