/**
 * Routes
 */
var appRoutes = function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeController',
      auth: true
    })
    .when('/public', {
      template: 'Public page :)',
      auth: false
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      login: true
    })
    .otherwise({redirectTo: '/login'});
}