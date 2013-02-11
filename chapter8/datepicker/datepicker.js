angular.module('myApp.directives', [])
  .directive('datepicker', function() {
    return {
      // Enforce the angularJS default of restricting the directive to
      // attributes only
      restrict: 'A',
      // Always use along with an ng-model
      require: '?ngModel',
      // This method needs to be defined and passed in from the
      // passed in to the directive from the view controller
      scope: {
        select: '&'        // Bind the select function we refer to the right scope
      },
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        var optionsObj = {};

        optionsObj.dateFormat = 'mm/dd/yy';
        var updateModel = function(dateTxt) {
          scope.$apply(function () {
            // Call the internal AngularJS helper to
            // update the two way binding
            ngModel.$setViewValue(dateTxt);
          });
        };

        optionsObj.onSelect = function(dateTxt, picker) {
          updateModel(dateTxt);
          if (scope.select) {
            scope.$apply(function() {
              scope.select({date: dateTxt});
            });
          }
        };

        ngModel.$render = function() {
          // Use the AngularJS internal 'binding-specific' variable
          element.datepicker('setDate', ngModel.$viewValue || '');
        };
        element.datepicker(optionsObj);
      }
    };
  });
