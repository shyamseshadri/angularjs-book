angular.module('myApp.services', []).
  factory('filterService', function() {
    return {
      activeFilters: {},
      searchText: ''
    };
  });
