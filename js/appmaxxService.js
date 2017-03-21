var lightmanager = angular.module('lightmanagerApp');

var httpAuthConfig;
var TOKEN = 'TOKEN';
var USER_ID = 'USER_ID';
var CREATION_DATE = 'CREATION_DATE';
var BACKEND = 'https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/';

lightmanager.factory("AppmaxxService", function($rootScope, $http, $log) {

	var service = {
		getUsername : function() {
			return data.username;
		},
		isLoggedIn : function() {
			return httpAuthConfig != undefined;
		},
		login : function(credentials) {
			return $http.post(BACKEND + 'token', credentials);
		},
		logout : function() {
			httpAuthConfig = undefined;

			$rootScope.globals = undefined;
			
			localStorage.removeItem(TOKEN);
			localStorage.removeItem(USER_ID);
			localStorage.removeItem(CREATION_DATE);
		},
        setUserData(userData) {
			$log.info('Login: ' + userData.userId);
			
			localStorage.setItem(TOKEN, userData.token);
			localStorage.setItem(USER_ID, userData.userId);
			localStorage.setItem(CREATION_DATE, userData.createdAt);

			httpAuthConfig = {
				headers:  {
					'X-Auth-Token' : userData.token
				}
			};
			
			$rootScope.globals = {};
			$rootScope.globals.userId = userId;
			$rootScope.globals.creationDate = creationDate;
			
			init();
		},
		getRooms : function() {
			return $http.get(BACKEND + 'room', httpAuthConfig);
		},
		getLights : function() {
			return $http.get(BACKEND + 'lights', httpAuthConfig);
		},
		getDevices : function() {
			return $http.get(BACKEND + 'devices', httpAuthConfig);
		},
		getMotors : function() {
			return $http.get(BACKEND + 'motors', httpAuthConfig);
		},
		getScenes : function() {
			return $http.get(BACKEND + 'scenes', httpAuthConfig);
		},
		toggleLight : function(light) {
			/* toggle switch state */
			light.state = !light.state;
			return $http.post(BACKEND + 'lights', light, httpAuthConfig);
		},
		toggleScene : function(scene) {
			/* toggle switch state */
			scene.state = !scene.state;
			return $http.post(BACKEND + 'scenes', scene, httpAuthConfig);
		},
		/* load backend information on application startup and publish to $rootScope */
		init : function() {
			service.getRooms().then(function(response) {
				$log.info(response.data);
				
				$rootScope.rooms = response.data;
			}, function(response) {
				$rootScope.$broadcast('backend.error', response);
			});
			
			service.getLights().then(function(response) {
				$log.info(response.data);
				
				$rootScope.lights = response.data;
			}, function(response) {
				$rootScope.$broadcast('backend.error', response);
			});
			
			service.getDevices().then(function(response) {
				$log.info(response.data);
				
				$rootScope.devices = response.data;
			}, function(response) {
				$rootScope.$broadcast('backend.error', response);
			});
			
			service.getMotors().then(function(response) {
				$log.info(response.data);
				
				$rootScope.motors = response.data;
			}, function(response) {
				$rootScope.$broadcast('backend.error', response);
			});
			
			service.getScenes().then(function(response) {
				$log.info(response.data);
				
				$rootScope.scenes = response.data;
			}, function(response) {
				$rootScope.$broadcast('backend.error', response);
			});
		},
		reload : function() {
			service.init();
		} 
	};
	
	var token = localStorage.getItem(TOKEN);
	var userId = localStorage.getItem(USER_ID);
	var creationDate = localStorage.getItem(CREATION_DATE);
	
	if (token != undefined && userId != undefined && creationDate != undefined) {
		$log.info('Relogin: ' + userId);

		httpAuthConfig = {
			headers:  {
				'X-Auth-Token' : token
			}
		};
		
		var userData = {};
		userData.userId = userId;
		userData.creationDate = creationDate;
		$rootScope.globals = userData;
		
		service.init();
	}
	
	return service;
});
