var app = angular.module('myApp', ['myApp.services']);

app.controller('MainCtrl', ['$scope', '$http', 'Paginator',
  function($scope, $http, Paginator) {
    $scope.query = 'Testing';
    var fetchFunction = function(offset, limit, callback) {
      $http.get('/search', {params: {query: $scope.query, offset: offset, limit: limit}}).success(callback);
    };

    $scope.searchPaginator = Paginator(fetchFunction, 10);
}]);
