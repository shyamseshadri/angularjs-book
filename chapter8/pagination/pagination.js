var app = angular.module('myApp.services', []);

app.factory('Paginator', function() {
  // Despite being a factory, the user of the service gets a new
  // Paginator every time he calls the service. This is because
  // we return a function that provides an object when executed
  return function(fetchFunction, pageSize) {
    pageSize = pageSize || 10;
    var paginator = {
      hasNextVar: false,
      next: function() {
        if (this.hasNextVar) {
          this.currentOffset += pageSize;
          this._load();
        }
      },
      _load: function() {
        var self = this;
        fetchFunction(this.currentOffset, pageSize + 1, function(items) {
          self.currentPageItems = items.slice(0, pageSize);
          self.hasNextVar = items.length === pageSize + 1;
        });
      },
      hasNext: function() {
        return this.hasNextVar;
      },
      previous: function() {
        if(this.hasPrevious()) {
          this.currentOffset -= pageSize;
          this._load();
        }
      },
      hasPrevious: function() {
        return this.currentOffset !== 0;
      },
      currentPageItems: [],
      currentOffset: 0
    };

    // Load the first page
    paginator._load();
    return paginator;
  };
});
