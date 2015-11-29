/**
 * Facebook Login Service
 */
var appFbLoginService = [
  '$rootScope',
  '$location',
  'facebook',
  'loginRedirect',
  function ($rootScope, $location, facebook, loginRedirect) {
    function fbLoginService() {
      var loginService = this;

      loginService.resolved = false;
      loginService.loggedIn = false;
      loginService.user     = false;

      facebook.then(function (fb) {
        var authResolver = function (res) {
          $rootScope.$broadcast('fbAuth', res.status == 'connected');
        };

        fb.do.getLoginStatus(authResolver);
        fb.do.Event.subscribe('auth.authResponseChange', authResolver);
      });
      
      $rootScope.$new().$on('fbAuth', function (event, connected) {
        loginService.loggedIn = connected;
        loginService.resolved = true;
        
        if (connected) {
          facebook.then(function (fb) {
            fb.q('/me').then(function (user) {
              loginService.user = user;
            });
            loginService.logout = function () {
              fb.do.logout();
              loginService.user = false;
            }
          });
        } else {
          loginService.user = false;
        }
        
        $rootScope.$apply(function () {
          $location.path((connected) ? loginRedirect : '/login');
        });
      });
      
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.login && $rootScope.auth.loggedIn) {
          $location.path('/');
        } else if (next.auth && !$rootScope.auth.loggedIn) {
          $location.path('/login');
        }
      });
    }

    return fbLoginService;
  }
]