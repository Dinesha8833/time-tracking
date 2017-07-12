app.controller('LogoutController', ['$scope', '$state', ($scope, $state) => {
  var token = localStorage.getItem('token');
  var role = localStorage.getItem('role');
  $scope.loggedIn = false;
  if(token && role) {
    $scope.loggedIn = true;
  }
  $scope.logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('role');
    $scope.loggedIn = false;
    $state.go('login');
  };
}]);
