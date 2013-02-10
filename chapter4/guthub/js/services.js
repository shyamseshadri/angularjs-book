'use strict';

var services = angular.module('services', []);

services.constant('apiKey', '502334b7e4b07b766e03f27c');
services.constant('restDataPrefix', 'https://api.mongolab.com/api/1/databases/guthub/collections/');

services.factory('Recipe', function($http, restDataPrefix, apiKey) {
  var urlPrefix = restDataPrefix + 'recipes/';
  var config = {params: {apiKey: apiKey}};

  var Recipe = function(data) {
    if (data._id) {
      this.id = data._id.$oid;
      delete data._id;
    }
    angular.extend(this, data);
  };

  Recipe.get = function(id) {
    return $http.get(urlPrefix + id, config).then(function(response) {
      return new Recipe(response.data);
    });
  };

  Recipe.prototype.create = function() {
    var recipe = this;
    return $http.post(urlPrefix, recipe, config).then(function(response) {
      recipe.id = response.data._id.$oid;
      return recipe;
    });
  };

  Recipe.prototype.save = function() {
    var recipe = this;
    return $http.put(urlPrefix + this.id, recipe, config).then(function(response) {
      recipe.id = response.data._id.$oid;
      return recipe;
    });
  };

  Recipe.query = function() {
    return $http.get(urlPrefix, config).then(function(response) {
      var recipes = [];

      response.data.forEach(function(data) {
        recipes.push(new Recipe(data));
      });

      return recipes;
    });
  };

  return Recipe;
});

