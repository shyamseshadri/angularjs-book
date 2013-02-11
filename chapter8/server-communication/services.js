var servicesModule = angular.module('myApp.services', []);

servicesModule.factory('errorService', function() {
  return {
    errorMessage: null,
    setError: function(msg) {
      this.errorMessage = msg;
    },
    clear: function() {
      this.errorMessage = null;
    }
  };
});

servicesModule.config(function ($httpProvider) {
  $httpProvider.responseInterceptors.push('errorHttpInterceptor');
});

// register the interceptor as a service, intercepts ALL angular ajax http calls
servicesModule.factory('errorHttpInterceptor', function ($q, $location, ErrorService, $rootScope) {
  return function (promise) {
    return promise.then(function (response) {
      return response;
    }, function (response) {
      if (response.status === 401) {
        $rootScope.$broadcast('event:loginRequired');
      } else if (response.status >= 400 && response.status < 500) {
        ErrorService.setError('Server was unable to find what you were looking for... Sorry!!');
      }
      return $q.reject(response);
    });
  };
});

servicesModule.factory('Authentication', function() {
  return {
    getTokenType: function() {
      return 'Awesome';
    },
    getAccessToken: function() {
      // Fetch from the server in real life
      return 'asdads131321asdasdasdas';
    }
  };
});

// This factory is only evaluated once, and authHttp is memoized. That is,
// future requests to authHttp service return the same instance of authHttp
servicesModule.factory('authHttp', function($http, Authentication) {
  var authHttp = {};

  // Append the right header to the request
  var extendHeaders = function(config) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = Authentication.getTokenType() + ' ' + Authentication.getAccessToken();
  };

  // Do this for each $http call
  angular.forEach(['get', 'delete', 'head', 'jsonp'], function(name) {
    authHttp[name] = function(url, config) {
      config = config || {};
      extendHeaders(config);
      return $http[name](url, config);
    };
  });

  angular.forEach(['post', 'put'], function(name) {
    authHttp[name] = function(url, data, config) {
      config = config || {};
      extendHeaders(config);
      return $http[name](url, data, config);
    };
  });

  return authHttp;
});
