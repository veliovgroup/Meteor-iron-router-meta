Package.describe({
  name: 'ostrio:iron-router-meta',
  version: '1.0.3',
  summary: 'Change meta tags on the fly within iron-router',
  git: 'https://github.com/VeliovGroup/Meteor-iron-router-meta',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['underscore', 'jquery', 'iron:router@1.0.7'], 'client');
  api.imply('ostrio:iron-router-title@0.2.0');
  api.addFiles('iron-router-meta.js', 'client');
});
