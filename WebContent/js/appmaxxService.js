var lightmanager = angular.module('lightmanagerApp');

lightmanager.factory("AppmaxxService", [ "$rootScope", "$http", "$log", function($rootScope, $http, $log) {

	var loginData = {
		userId : '',
		token : '',
		createdAt : ''
	};
	
	var httpAuthConfig;

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
			
			/* TODO save authentication token in persistent storage */
			httpAuthConfig = {
				headers:  {
					'X-Auth-Token' : userData.token
				}
			};
		},
		getRooms : function() {
			return $http.get("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/room", httpAuthConfig);
		}
	};
} ]);