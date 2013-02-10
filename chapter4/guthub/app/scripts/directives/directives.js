'use strict';

var directives = angular.module('directives', []);

directives.directive('markdown', function() {
  var showdown = new Showdown.converter();
  return {
    restrict: 'E',
    scope: {content: '&content'},
    link: function(scope, element, attrs) {
      scope.$watch(scope.content, function(value) {
        if (value) {
          var htmlText = showdown.makeHtml(value);
          element.html(htmlText);
        }
      });
    }
  };
});

directives.directive('butterbar', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      element.addClass('hide');

      $rootScope.$on('$routeChangeStart', function() {
        element.removeClass('hide');
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        element.addClass('hide');
      });
    }
  };
}]);

directives.directive('focus', function() {
  return {
    link: function(scope, element, attrs) {
      element[0].focus();
    }
  };
});
