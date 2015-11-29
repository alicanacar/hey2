/**
 * Facebook Service
 */
var facebookService = [
  '$rootScope',
  '$q',
  'fbAppId',
  'fbChannelUrl',
  function ($rootScope, $q, fbAppId, fbChannelUrl) {
      var deferred = $q.defer();
      
      angular.element('body').prepend('<div id="fb-root">');
      
      window.fbAsyncInit = function () {
          FB.init({
              appId:      fbAppId,
              channelUrl: fbChannelUrl,
              status:     true,
              xfbml:      true
          });
          
          $rootScope.$apply(function () {
              deferred.resolve({
                  q: function (endpoint) {
                      var deferred = $q.defer();
                      FB.api(endpoint, function (response) {
                          $rootScope.$apply(function () {
                              deferred.resolve(response);
                          });
                      });
                      return deferred.promise;
                  },
                  do: FB
              });
          });
      };
      
      (function (d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/all.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      
      return deferred.promise;
  }
]