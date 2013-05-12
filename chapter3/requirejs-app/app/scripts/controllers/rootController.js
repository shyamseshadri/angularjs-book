define(['controllers/controllers', 'services/userService'],
  function(controllers) {
    controllers.controller('RootCtrl', ['$scope', 'UserService',
      function($scope, UserService) {
        $scope.name = UserService.getUser();
    }]);
});
