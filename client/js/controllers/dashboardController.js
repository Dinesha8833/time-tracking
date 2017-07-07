app.controller('DashboardController', [
  '$scope',
  '$state',
  '$http',
  function($scope, $state, $http){
    var token = localStorage.getItem('token');
    var role = localStorage.getItem('role');
    if(!token || !role)
      $state.go('login');
    $scope.valid = false;
    $scope.invalid = false;
    $scope.updateMode = false;
    $scope.today = (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' +  new Date().getFullYear();
    $scope.getTasks = function() {
      $http({
        method: 'GET',
        url: '/tasks',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .success((response, status) => {
        response.tasks.forEach(task => {
          var date = new Date(task.createdAt);
          task.createdAt = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
        });
        $scope.tasks = response.tasks;
      })
      .error((data, status) => {
        if(status === 401)
          $state.go('login');
        console.log(data);
      });
    }
    $scope.getTasks();
    $scope.addTask = function(params) {
      $http({
        method: 'POST',
        url: '/tasks',
        data: {
          title: $scope.task_title,
          description: $scope.task_description,
          time: $scope.time
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .success((response, status) => {
        $scope.valid = true;
        $scope.invalid = false;
        $scope.message = 'Task Added Successfully';
        $scope.task_title = $scope.task_description = $scope.time = "";
        $scope.getTasks();
      })
      .error((data, status) => {
        if(status === 401)
          $state.go('login');
        $scope.valid = false;
        $scope.invalid = true;
        $scope.message = 'Invalid Task';
        console.log(data);
      });
    }
  }
]);