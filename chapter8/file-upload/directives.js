angular.module('myApp.directives', []).
directive('fileupload', function() {
  return {
    restrict: 'A',
    scope: {
      done: '&',
      progress: '&'
    },
    link: function(scope, element, attrs) {
      var optionsObj = {
        dataType: 'json'
      };

      if (scope.done) {
        optionsObj.done = function() {
          scope.$apply(function() {
            scope.done({e: e, data: data});
          });
        };
      }

      if (scope.progress) {
        optionsObj.progress = function(e, data) {
          scope.$apply(function() {
            scope.progress({e: e, data: data});
          });
        }
      }

      // the above could easily be done in a loop, to cover
      // all API's that Fileupload provides

      element.fileupload(optionsObj);
    }
  };
});
