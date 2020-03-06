module.exports = {
  'Test WordPress Mods': (browser) => {
    browser
      // Login to WP Dashboard
      .url('http://localhost/wp/wp-login.php')
      .setValue('#user_login', '') // Fill out your own value
      .setValue('#user_pass', '') // Fill out your own values
      .click('#wp-submit')

      // Go to New Post Page
      .url('http://localhost/wp/wp-admin/post-new.php')

      // Test MD > HTML conversion
      .setValue('#content', '## level 2 heading\n### level 3 heading')
      .click('input[value="MD"]')
      .assert.valueContains('#content', '<h2 id="level2heading">level 2 heading</h2>')
      .assert.valueContains('#content', '<h3 id="level3heading">level 3 heading</h3>')

      .pause(5000)
      .end();
  },
};
