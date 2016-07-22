var lightmanager = angular.module('lightmanagerApp');

lightmanager.factory("AppmaxxService", [ "$rootScope", "$http", "$log", function($rootScope, $http, $log) {

	var loginData = {
		userId : '',
		authToken : '',
		createdAt : ''
	};

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
			$http.post("https://appmaxx.selfhost.eu:32011/AppmaxxRESTService/rest/token", credentials).then(function(response) {
				loginData = response.data;

				$log.info(loginData.userId + " has logged in.");
				$rootScope.$broadcast('login.data', loginData);
			}, function(response) {
				$rootScope.$broadcast('error.message', response);
			}).finally(function() {
				 credentials.userId = '';
				 credentials.password = '';
			});
		}
	};
} ]);