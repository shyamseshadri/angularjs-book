describe('Simple E2e Test', function() {
  it('Should open the front page and check', function() {
    browser().navigateTo('/#/');
    pause();
    expect(element('#test').text()).toEqual('Hi testUser');
    pause();
  });
});
