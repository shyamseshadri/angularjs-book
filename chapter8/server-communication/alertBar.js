// <div alert-bar alertMessage="myMessageVar"></div>
angular.module('myApp.directives', []).
directive('alertBar', ['$parse', function($parse) {
  return {
    restrict: 'A',
    template: '<div class="alert alert-error alert-bar" ng-show="errorMessage">' +
      '<button type="button" class="close" ng-click="hideAlert()">x</button>' +
      '{{errorMessage}}</div>',

    link: function(scope, elem, attrs) {
      var alertMessageAttr = attrs['alertmessage'];
      scope.errorMessage = null;

      scope.$watch(alertMessageAttr, function(newVal) {
        scope.errorMessage = newVal;
      });
      scope.hideAlert = function() {
        scope.errorMessage = null;
        // Also clear the error message on the bound variable
        // Do this so that in case the same error happens again
        // the alert bar will be shown again next time
        $parse(alertMessageAttr).assign(scope, null);
      };
    }
  };
}]);
