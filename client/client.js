var app = angular.module("taskApp", []);

app.controller("taskController", ['$scope', '$http', function($scope, $http){
  $scope.task_name = 'Enter task here';
  $scope.tasks = [];

  var fetchTasks = function(){
    console.log('fetchTasks is getting called');
    $http.get('/tasks').then(function(response){
      console.log('get request from /tasks', response);
      if(response.status !==200){
        console.log('Error in fetchTasks function');
      }
      $scope.task_name = '';
      $scope.tasks = response.data;
      return response.data;
    })
  }

  $scope.submitTask = function(){
    console.log('task submitted');
    $http.post('/tasks', {task_name: $scope.task_name}).then(fetchTasks);
  }
  $scope.removeTask = function(id){
    console.log('removeTask id!!!!!!!', id);
    $http.delete('/tasks/' + id).then(fetchTasks);
    console.log('hello');
  }
  $scope.toggleTask = function(id){
    console.log('toggleTask id!!!!!!!', id);
    $http.post('/tasks/toggle' + id).then(fetchTasks);
    console.log('hello');
  }
  fetchTasks();
}]);
