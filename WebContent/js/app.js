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

// TODO TW check login state on location change and redirect to login page if not logged in
//lightmanager.run(['$rootScope', '$location', '$cookieStore', '$http',
//    function ($rootScope, $location, $cookieStore, $http) {
//        // keep user logged in after page refresh
//        $rootScope.globals = $cookieStore.get('globals') || {};
//        if ($rootScope.globals.currentUser) {
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//        }
//  
//        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//            // redirect to login page if not logged in
//            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                $location.path('/login');
//            }
//        });
    }]);
