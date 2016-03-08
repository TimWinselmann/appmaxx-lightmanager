var lightmanager = angular.module('lightmanager', ['ui.router', 'ngTouch']);

lightmanager.controller('MainCtrl', ['$scope', '$state',
	function($scope, $state) {
		$scope.title = 'Lightmanager';
		
		$scope.swiped = function (left) {
			// FIXME Ugly hack to make swiping between views available.
			// Should be something like ui.router state next.
			if ($state.$current.self.name == 'lights') {
				$state.go('devices');
			} else {
				$state.go('lights');
			}
		}
	}
]);

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

lightmanager.controller('LightsCtrl', ['$rootScope', '$scope', '$state',
   function($rootScope, $scope, $state) {
		$scope.title  = 'Lights!';
	}
]);

lightmanager.controller('DevicesCtrl', ['$rootScope', '$scope', '$state',
    function($rootScope, $scope, $state) {
		$scope.title  = 'Devices!';
	}
]);

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});