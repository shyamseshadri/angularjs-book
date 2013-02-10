angular.module('myApp.services', []).
  factory('filterService', function() {
    return {
      filters: {},
      searchText: ''
    };
  });
