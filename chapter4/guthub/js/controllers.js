'use strict';

angular.module('guthub', ['directives', 'services']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, resolve:ListCtrl.resolve, templateUrl:'/views/list.html'}).
      when('/edit/:recipeId', {controller:EditRecipeCtrl, resolve:EditRecipeCtrl.resolve, templateUrl:'/views/recipeForm.html'}).
      when('/view/:recipeId', {controller:ViewRecipeCtrl, resolve:ViewRecipeCtrl.resolve, templateUrl:'/views/viewRecipe.html'}).
      when('/new', {controller:NewRecipeCtrl, templateUrl:'/views/recipeForm.html'}).
      otherwise({redirectTo:'/'});
  });

function ListCtrl($scope, recipes) {
  $scope.recipes = recipes;
}

var fetchRecipes = function(Recipe, $route) {
  return Recipe.query();
};

ListCtrl.resolve = {
  recipes: fetchRecipes
};

function ViewRecipeCtrl($scope, $location, $routeParams, recipe) {
  $scope.recipe = recipe;

  $scope.edit = function() {
    $location.path('/edit/' + $routeParams.recipeId);
  };
}

var fetchRecipe = function(Recipe, $route) {
  return Recipe.get($route.current.params.recipeId);
};

// How to get a recipe
ViewRecipeCtrl.resolve = {
  recipe: fetchRecipe
};

function EditRecipeCtrl($scope, $location, $routeParams, recipe) {
  $scope.recipe = recipe;

  $scope.save = function() {
    $scope.recipe.save().then(function(recipe){
      $location.path('/view/' + recipe.id);
    });
  };

  $scope.remove = function($scope, $location, $routeParams) {
    delete $scope.recipe;
    $location.path('/');
  };
}

EditRecipeCtrl.resolve = {
  recipe: fetchRecipe
};

function NewRecipeCtrl($scope, $location, Recipe) {
  $scope.recipe = new Recipe({ingredients:[{}]});

  $scope.save = function() {
    $scope.recipe.save().then(function(recipe){
      $location.path('/view/' + recipe.id);
    });
  };
}

function IngredientsCtrl($scope) {
  $scope.addIngredient = function() {
    var ingredients = $scope.recipe.ingredients;
    ingredients[ingredients.length] = {};
  };
}
