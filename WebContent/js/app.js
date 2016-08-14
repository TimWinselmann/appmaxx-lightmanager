var lightmanager = angular.module('lightmanagerApp', [ 'ui.router', 'ngCookies' ]);

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

lightmanager.run(['$rootScope', '$location', '$cookieStore', '$http', '$state', 'AppmaxxService', '$log',
    function ($rootScope, $location, $cookieStore, $http, $state, AppmaxxService, $log) {
//        //TODO keep user logged in after page refresh
//        $rootScope.globals = $cookies.get('globals') || {};
//        if ($rootScope.globals.currentUser) {
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//        }

        $rootScope.$on('$stateChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if (next.name !== 'login' && !AppmaxxService.isLoggedIn()) {
            	event.preventDefault();
            	$log.debug('Access to restricted state \'' + next.name + '\', redirecting to login page');
            	$state.go('login');
            }
        });
    }]);
