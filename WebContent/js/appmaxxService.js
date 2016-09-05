var lightmanager = angular.module('lightmanagerApp');

var X_AUTH_TOKEN = 'X_AUTH_TOKEN';

lightmanager.factory("AppmaxxService", [ "$rootScope", "$http", "$cookies", "$log", function($rootScope, $http, $cookies, $log) {

	var userData = $cookies.getObject(X_AUTH_TOKEN);
	if (userData != undefined) {
		var httpAuthConfig = {
				headers:  {
					'X-Auth-Token' : userData.token
				}
		};
		/* TODO TW broadcast triggers before footer controller registers listener */
		$rootScope.$broadcast('user-loogin', userData);
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
			$cookies.remove(X_AUTH_TOKEN);
		},
        setUserData(userData) {
			$cookies.putObject(X_AUTH_TOKEN, userData);

			httpAuthConfig = {
				headers:  {
					'X-Auth-Token' : userData.token
				}
			};

			$log.info(userData.userId + " has logged in.");
			$rootScope.$broadcast('user-loogin', userData);
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
} ]);
