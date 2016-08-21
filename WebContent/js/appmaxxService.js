var lightmanager = angular.module('lightmanagerApp');

var X_AUTH_TOKEN = 'X_AUTH_TOKEN';

lightmanager.factory("AppmaxxService", [ "$rootScope", "$http", "$cookies", "$log", function($rootScope, $http, $cookies, $log) {

	var loginData = {
		userId : '',
		token : '',
		createdAt : ''
	};
	
	var httpAuthConfig = $cookies.getObject(X_AUTH_TOKEN);
	
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
			loginData = userData;
			
			httpAuthConfig = {
				headers:  {
					'X-Auth-Token' : userData.token
				}
			};
			$cookies.putObject(X_AUTH_TOKEN, httpAuthConfig); 
		},
		getRooms : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/room", httpAuthConfig);
		},
		getLights : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/lights", httpAuthConfig);
		}
	};
} ]);