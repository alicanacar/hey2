/**
 * Login Controller
 */
var appLoginController = [
  '$scope',
  'facebook',
  function($scope, facebook) {
    facebook.then(function (fb) {
      $scope.fb = fb;
    });
  }
]