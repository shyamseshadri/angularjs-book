var app = angular.module('myApp', []);

// We define a factory the socket service is instantiated only once, and
// thus act as a singleton for the scope of the application
app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:8080');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

function MainCtrl($scope, socket) {

  $scope.message = '';
  $scope.messages = [];

  // When we see a new msg event from the server
  socket.on('new:msg', function (message) {
  $scope.messages.push(message);
});

// Tell the server there is a new message
$scope.broadcast = function() {
  socket.emit('broadcast:msg', {message: $scope.message});
  $scope.messages.push($scope.message);
  $scope.message = '';
};
}
