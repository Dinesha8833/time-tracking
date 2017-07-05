app.controller('LoginController', [
  '$scope',
  '$window',
  '$state',
  '$auth',
  function($scope, $window, $state, $auth){
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
  }
]);
