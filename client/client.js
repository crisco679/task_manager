var app = angular.module("taskApp", []);
app.controller("taskController", ['$scope', '$http', function($scope, $http){
  $scope.task_name = 'Enter task here';
  $scope.tasks = [];
  var fetchTasks = function(){
    $http.get('/tasks').then(function(response){
      if(response.status !==200){
        console.log('Error in fetchTasks function');
      }
      $scope.task_name = '';
      $scope.tasks = response.data;
      return response.data;
    })
  }
  $scope.submitTask = function(){
    $http.post('/tasks', {task_name: $scope.task_name}).then(fetchTasks);
  }
  $scope.removeTask = function(id){
    $http.delete('/tasks/' + id).then(fetchTasks);
  }
  $scope.toggleTask = function(id){
    $http.post('/tasks/toggle' + id).then(fetchTasks);
  }
  fetchTasks();
}]);
