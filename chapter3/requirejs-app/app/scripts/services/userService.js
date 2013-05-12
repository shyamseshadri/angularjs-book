define(['services/services'],
  function(services) {
    services.factory('UserService', [
      function() {
        return {
          getUser: function() {
            return 'testUser';
          }
        };
      }]);
  });
