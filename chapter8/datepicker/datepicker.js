angular.module('myApp.directives', [])
  .directive('datepicker', function($parse) {
    return {
      // Enforce the angularJS default of restricting the directive to
      // attributes only
      restrict: 'A',
      // Always use along with an ng-model
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;
        // the "select" argument defines which function the directive
        // should call when a new date is selected via the UI
        var selectFn = $parse(attrs.select);
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
          if (selectFn) {
            scope.$apply(function() {
              selectFn(scope, {date: dateTxt});
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
