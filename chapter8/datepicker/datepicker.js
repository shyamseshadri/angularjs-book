angular.module('myApp.directives', []).
  directive('datepicker', function() {
    return {
      restrict: 'A',       // Only allow this directive as an attribute
      require: '?ngModel', // Always use along with an ng-model
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        var optionsObj = {};

        optionsObj.dateFormat = 'mm/dd/yy';
        var updateModel = function(dateTxt) {
          scope.$apply(function () {
            ngModel.$setViewValue(dateTxt);
          });
        };

        optionsObj.onSelect = function(dateTxt, picker) {
          updateModel(dateTxt);
          if (attrs.onSelect) {
            scope.$apply(function() {
              scope[attrs.onSelect](dateTxt);
            });
          }
        };

        //updateModel();
        ngModel.$render = function() {
          element.datepicker('setDate', ngModel.$viewValue || '');
        };
        element.datepicker(optionsObj);
      }
    };
  });
