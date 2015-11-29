/**
 * Home Controller
 */
var appHomeController = [
  '$scope',
  'facebook',
  function($scope, facebook) {
    $scope.friends = [];

    facebook.then(function (fb) {
      $scope.fb = fb;
      
      $scope.fb.q('/me').then(function (response) {
        $scope.me = response;
      });

      $scope.fb.q('/me?fields=friends.fields(picture,name)')
        .then(function (response) {
          _(response.friends.data).each(function (friend) {
            $scope.friends.push(friend);
          });
        });
    });
  }
];