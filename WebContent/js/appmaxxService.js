var lightmanager = angular.module('lightmanagerApp');

var LS_TOKEN = 'LS_TOKEN';

lightmanager.factory("AppmaxxService", [ "$rootScope", "$http", "$log", function($rootScope, $http, $log) {

	var loginData = {
		userId : '',
		token : '',
		createdAt : ''
	};
	
	var savedToken = localStorage.getItem(LS_TOKEN);
	var httpAuthConfig;
	if (savedToken) {
		httpAuthConfig = JSON.parse(savedToken);
	}

	function isEmpty(str) {
		return (!str || 0 === str.length);
	}

	return {
		getUsername : function() {
			return data.username;
		},
		getAuthToken : function() {
			return data.authToken;
		},
		isLoggedIn : function() {
			return isEmpty(data.authToken);
		},
		login : function(credentials) {
			return $http.post("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/token", credentials);
		},
        setUserData(userData) {
			loginData = userData;
			
			httpAuthConfig = {
				headers:  {
					'X-Auth-Token' : userData.token
				}
			};
			/* TODO save authentication token in cookie storage */
			localStorage.setItem(LS_TOKEN, JSON.stringify(httpAuthConfig));
		},
		getRooms : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/room", httpAuthConfig);
		}
	};
} ]);