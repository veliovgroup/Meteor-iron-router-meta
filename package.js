Package.describe({
  name: 'ostrio:iron-router-meta',
  version: '1.1.0',
  summary: 'Change meta tags, Scripts and CSS on the fly within iron-router',
  git: 'https://github.com/VeliovGroup/Meteor-iron-router-meta',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['underscore', 'jquery', 'coffeescript', 'ostrio:iron-router-helper-class@1.0.1'], 'client');
  api.addFiles('iron-router-meta.coffee', 'client');
  api.imply('ostrio:iron-router-title@1.0.3', 'client');
});