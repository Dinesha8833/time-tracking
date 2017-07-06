app.controller('AuthSuccessController', [
  '$location',
  '$window',
  function($location, $window){
    localStorage.setItem('token', $location.search().access_token);
    localStorage.setItem('role', $location.search().role);
    $window.opener.location.pathname = '/dashboard';
    $window.close();
  }
]);
