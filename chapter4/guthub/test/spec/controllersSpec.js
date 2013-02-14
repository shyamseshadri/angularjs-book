describe('Controllers', function() {
  var $scope, ctrl;
  //you need to indicate your module in a test
  beforeEach(module('guthub'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('ListCtrl', function() {
    var mockBackend, recipe;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Recipe) {
      recipe = Recipe;
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('ListCtrl', {
        $scope: $scope,
        recipes: [1, 2, 3]
      });
    }));

    it('should have list of recipes', function() {
      expect($scope.recipes).toEqual([1, 2, 3]);
    });
  });

  describe('MultiRecipeLoader', function() {
    var mockBackend, recipe, loader;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function(_$httpBackend_, Recipe, MultiRecipeLoader) {
      recipe = Recipe;
      mockBackend = _$httpBackend_;
      loader = MultiRecipeLoader;
    }));

    it('should load list of recipes', function() {
      mockBackend.expectGET('/recipes').respond([{id: 1}, {id: 2}]);

      var recipes;

      var promise = loader();
      promise.then(function(rec) {
        recipes = rec;
      });

      expect(recipes).toBeUndefined();

      mockBackend.flush();

      expect(recipes).toEqualData([{id: 1}, {id: 2}]);
    });
  });

  describe('EditController', function() {
    var mockBackend, location;
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Recipe) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();

      ctrl = $controller('EditCtrl', {
        $scope: $scope,
        $location: $location,
        recipe: new Recipe({id: 1, title: 'Recipe'})
      });
    }));

    it('should save the recipe', function() {
      mockBackend.expectPOST('/recipes/1', {id: 1, title: 'Recipe'}).respond({id: 2});

      // Set it to something else to ensure it is changed during the test
      location.path('test');

      $scope.save();
      expect(location.path()).toEqual('/test');

      mockBackend.flush();

      expect(location.path()).toEqual('/view/2');
    });

    it('should remove the recipe', function() {
      expect($scope.recipe).toBeTruthy();
      location.path('test');

      $scope.remove();

      expect($scope.recipe).toBeUndefined();
      expect(location.path()).toEqual('/');
    });
  });
  // Other controller describes here as well

});
