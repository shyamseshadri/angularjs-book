var app = angular.module('myApp', ['myApp.directives']);

app.controller('MainCtrl', function($scope) {
  $scope.uploadFinished = function(e, data) {
    console.log('We just finished uploading this baby...');
  };
});
