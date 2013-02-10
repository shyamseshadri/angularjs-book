'use strict';

var app = angular.module('guthub', ['directives', 'services']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'ListCtrl',
        resolve: {
          recipes: function(RecipesLoader) {
            return RecipesLoader();
          }
        },
        templateUrl:'/views/list.html'
      }).when('/edit/:recipeId', {
        controller: 'EditRecipeCtrl',
        resolve: {
          recipe: function(RecipeLoader) {
            return RecipeLoader();
          }
        },
        templateUrl:'/views/recipeForm.html'
      }).when('/view/:recipeId', {
        controller: 'ViewRecipeCtrl',
        resolve: {
          recipe: function(RecipeLoader) {
            return RecipeLoader();
          }
        },
        templateUrl:'/views/viewRecipe.html'
      }).when('/new', {
        controller: 'NewRecipeCtrl',
        templateUrl:'/views/recipeForm.html'
      }).otherwise({redirectTo:'/'});
}]);

app.controller('ListCtrl', ['$scope', 'recipes', function($scope, recipes) {
  $scope.recipes = recipes;
}]);

app.controller('ViewRecipeCtrl', ['$scope', '$location', 'recipe', function($scope, $location, recipe) {
  $scope.recipe = recipe;

  $scope.edit = function() {
    $location.path('/edit/' + recipe.id);
  };
}]);

app.controller('EditRecipeCtrl', ['$scope', '$location', 'recipe', function($scope, $location, recipe) {
  $scope.recipe = recipe;

  $scope.save = function() {
    $scope.recipe.$save(function(recipe) {
      $location.path('/view/' + recipe.id);
    });
  };

  $scope.remove = function() {
    delete $scope.recipe;
    $location.path('/');
  };
}]);

app.controller('NewRecipeCtrl', ['$scope', '$location', 'Recipe', function($scope, $location, Recipe) {
  $scope.recipe = new Recipe({ingredients:[{}]});

  $scope.save = function() {
    $scope.recipe.$save(function(recipe) {
      $location.path('/view/' + recipe.id);
    });
  };
}]);

app.controller('IngredientsCtrl', ['$scope', function($scope) {
  $scope.addIngredient = function() {
    var ingredients = $scope.recipe.ingredients;
    ingredients[ingredients.length] = {};
  };
  $scope.removeIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1);
  };
}]);
