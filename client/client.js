var app = angular.module("taskApp", []);

app.controller("taskController", ['$scope', '$http', function($scope, $http){
  $scope.task_name = 'Enter task here';
  $scope.task_names = [];
  $scope.toggle = true;

var fetchTasks = function(){
  console.log('fetchTasks is getting called');
  $http.get('/tasks').then(function(response){
    console.log('get request from /tasks', response);
    if(response.status !==200){
      console.log('Error in fetchTasks function');
    }
    $scope.task_name = '';
    $scope.task_names = response.data;
    return response.data;
  })
}

$scope.submitTask = function(){
  console.log('task submitted');
  $http.post('/tasks', {task_name: $scope.task_name}).then(fetchTasks);
}
fetchTasks();

$scope.removeTask = function(){
  console.log('removeTask is starting');
  $http.delete('/tasks', {task_name: $scope.task_name});
  }

}]);
