describe('GutHub App', function() {
  it('should show a list of recipes', function() {
    browser().navigateTo('/#/');
    // Our Default GutHub recipes list has two recipes
    expect(repeater('.recipes li').count()).toEqual(2);
  });
});
