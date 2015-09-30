Package.describe({
  name: 'ostrio:iron-router-meta',
  version: '1.0.6',
  summary: 'Change meta tags, links and CSS on the fly within iron-router',
  git: 'https://github.com/VeliovGroup/Meteor-iron-router-meta',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['underscore', 'jquery', 'iron:router@1.0.9', 'coffeescript', 'ostrio:iron-router-helper-class@1.0.0'], 'client');
  api.addFiles('iron-router-meta.coffee', 'client');
  api.imply('ostrio:iron-router-helper-class@1.0.0');
  api.imply('ostrio:iron-router-title@1.0.1');
});
