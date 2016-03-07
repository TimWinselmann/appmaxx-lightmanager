var lightmanager = angular.module('lightmanager', ['ui.router']);

lightmanager.controller('MainCtrl',
	function($scope) {
		$scope.title = 'Lightmanager';
	}
);

lightmanager.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		$stateProvider
	    .state('lights', {
	    	url: '/lights',
	    	templateUrl: 'partials/lights.html',
	    	controller: 'LightsCtrl',
	    	authenticate: false
	    })
	    .state('devices', {
	    	url: '/devices',
	    	templateUrl: 'partials/devices.html',
	    	controller: 'DevicesCtrl',
	    	authenticate: false
	    });
	  
		$urlRouterProvider.otherwise('/lights');
	}
]);

lightmanager.controller('LightsCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
	$scope.title  = 'Lights!';
}]);

lightmanager.controller('DevicesCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
	$scope.title  = 'Devices!';
}]);
