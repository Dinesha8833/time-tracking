app.controller('LoginController', [
  '$scope',
  '$window',
  '$state',
  '$auth',
  function($scope, $window, $state, $auth){
    var token = localStorage.getItem('token');
    var role = localStorage.getItem('role');
    if(token && role)
      $state.go('dashboard');
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
  }
]);
