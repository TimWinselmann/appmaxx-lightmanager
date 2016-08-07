var lightmanager = angular.module('lightmanagerApp', [ 'ui.router' ]);

lightmanager.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('root', {
		url : '',
		abstract : true,
		views : {
			navigation : {
				templateUrl : 'partials/navbar.html'
			},
			error : {
				templateUrl : 'partials/error.html',
				controller : 'ErrorCtrl'
			},
			footer : {
				templateUrl : 'partials/footer.html',
				controller : 'FooterCtrl'
			}
		}
	});

	$stateProvider.state('login', {
		url : '/login',
		views : {
			'content@' : {
				templateUrl : 'partials/login.html',
				controller : 'LoginCtrl'
			}
		},
		parent : 'root',
		authenticate : false
	});

	$stateProvider.state('lights', {
		url : '/lights',
		views : {
			'content@' : {
				templateUrl : 'partials/lights.html',
				controller : 'LightsCtrl'
			}
		},
		parent : 'root',
		authenticate : true
	});
	
	
	$urlRouterProvider.otherwise('/login');
	
} ]);