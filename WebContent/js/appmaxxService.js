var lightmanager = angular.module('lightmanagerApp');

var httpAuthConfig;
var TOKEN = 'TOKEN';
var USER_ID = 'USER_ID';
var CREATION_DATE = 'CREATION_DATE';

lightmanager.factory("AppmaxxService", function($rootScope, $http, $log) {

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
	}

	function isEmpty(str) {
		return (!str || 0 === str.length);
	}

	return {
		getUsername : function() {
			return data.username;
		},
		isLoggedIn : function() {
			return httpAuthConfig != undefined;
		},
		login : function(credentials) {
			return $http.post("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/token", credentials);
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
		},
		getRooms : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/room", httpAuthConfig);
		},
		getLights : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/lights", httpAuthConfig);
		},
		getDevices : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/devices", httpAuthConfig);
		},
		getMotors : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/motors", httpAuthConfig);
		},
		getScenes : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/scenes", httpAuthConfig);
		},
		toggleLight : function(light) {
			/* toggle switch state */
			light.state = !light.state;
			return $http.post("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/lights", light, httpAuthConfig);
		},
		toggleScene : function(scene) {
			/* toggle switch state */
			scene.state = !scene.state;
			return $http.post("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/scenes", scene, httpAuthConfig);
		}
	};
});
