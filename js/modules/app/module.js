angular.module('app', ['app.controllers', 'app.services', 'app.settings', 'facebook'])

	/**
	 * Routes
	 */
	.config(['$routeProvider', appRoutes])

	/**
	 * Run
	 */
	.run([
		'$rootScope',
		'fbLoginService',
		function ($rootScope, fbLoginService) {
			$rootScope.auth = new fbLoginService();
		}
	])