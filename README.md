Reactive meta tags, Scripts and CSSs for Meteor and Iron-Router
========
Change meta tags on the fly within [iron-router](https://atmospherejs.com/iron/router). This package can create `meta` tags, and `link`/`script` tags as well.

This package may also help to use dynamic CSSs and JSs, so you may use different style sheets - for different routes.

This package supports `meta`, `script` and `link` options (properties) defined on objects below, ordered by prioritization:
 - `Router.route()` [*overrides all*]
 - `RouteController.extend()`
 - `Router.configure()` [*might be overridden by any above*]

__Note__: this package implies [ostrio:iron-router-title](https://atmospherejs.com/ostrio/iron-router-title) package.

Install:
========
```shell
meteor add ostrio:iron-router-meta
```

Demo application:
========
  - [Source](https://github.com/VeliovGroup/Meteor-iron-router-meta/tree/master/demo)
  - ~~Live: http://iron-router-meta.meteor.com~~ (*We are looking for free hosting for this demo*)

ToC:
========
 - [Change CSS and JS per route](https://github.com/VeliovGroup/Meteor-iron-router-meta#change-css-and-js-per-route)
 - [Set default tags](https://github.com/VeliovGroup/Meteor-iron-router-meta#set-default-tags)
 - [Set on route level](https://github.com/VeliovGroup/Meteor-iron-router-meta#set-on-route-level)
 - [Set via RouteController](https://github.com/VeliovGroup/Meteor-iron-router-meta#set-via-routecontroller)
 - [Other examples](https://github.com/VeliovGroup/Meteor-iron-router-meta#other-examples)
 - [Use function(s) as value](https://github.com/VeliovGroup/Meteor-iron-router-meta#use-functions-as-value)
 - [Use function's context](https://github.com/VeliovGroup/Meteor-iron-router-meta#use-functions-context)
 - [Bootstrap configuration](https://github.com/VeliovGroup/Meteor-iron-router-meta#bootstrap-configuration)

Usage:
========
#### Change CSS and JS per route:
```javascript
// Set default CSS and JS for all routes
Router.configure({
  link: {
    twbs: {
      href: 'https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css',
      rel: 'stylesheet'
    }
  },
  script: {
    twbs: "https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/js/bootstrap.min.js"
  }
});

// Rewrite default CSS, for second route, via controller:
var secondPageController = RouteController.extend({
  link: {
    twbs: {
      href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
      rel: 'stylesheet'
    }
  },
  script: {
    twbs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
  }
});

Router.route('secondPage', {
  controller: secondPageController
});

// Rewrite default CSS, for third route via route settings:
Router.route('thirdPage', {
  link: {
    twbs: {
      href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha/css/bootstrap.min.css',
      rel: 'stylesheet'
    }
  },
  script: {
    twbs: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha/js/bootstrap.min.js"
  }
});
```

#### Set default tags:
```javascript
Router.configure({
  meta: {
    charset: {
      charset: 'UTF-8'
    },
    keywords: {
      name: 'keywords',
      itemprop: 'keywords',
      content: 'Awesome, Meteor, based, app'
    },
    robots: 'index, follow',
    google: 'notranslate'
  },
  link: {
    canonical: function() {
      return window.location.href;
    },
    image: {
      rel: 'image',
      sizes: '500x500',
      href: 'http://doma..'
    },
    publisher: 'http://plus.google...',
    twbs: {
      href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
      rel: 'stylesheet'
    }
  },
  script: {
    twbs: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
    base64: {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js',
      async: true,
      defer: true
    }
  }
});
```

#### Set on route level
```javascript
Router.route('account', {
  template: 'account',
  path: '/me/account',
  title: 'My Account',
  meta: {
    keywords: {
      name: 'keywords',
      itemprop: 'keywords',
      content: 'User, Account'
    }
  }
});
```

#### Set via RouteController:
```javascript
var accountController = RouteController.extend({
  meta: {
    keywords: 'User, Account'
  }
});

Router.route('account', {
  controller: accountController
});
```

#### Other examples:
Set only `name` and `content` attributes on `meta` tag:
```javascript
Router.route('routeName', {
  meta: {
    name: 'content'
  }
});
```

Set only `rel` and `href` attributes on `link` tag:
```javascript
Router.route('routeName', {
  link: {
    rel: 'href'
  }
});
```

Set multiple attributes on `meta` tag:
```javascript
Router.route('routeName', {
  meta: {
    uniqueName: {
      name: 'name',
      content: 'content',
      value: 'value',
      'og:prop': 'value',
      itemprop: 'value'
    }
  }
});
```

Set multiple attributes on `link` tag:
```javascript
Router.route('routeName', {
  link: {
    uniqueName: {
      rel: 'name',
      sizes: 'value',
      href: 'value',
      type: 'value'
    }
  }
});
```

#### Use function(s) as value:
```javascript
Router.route('routeName', {
  meta: {
    url: {
      property: 'og:url',
      itemprop: 'url',
      content: function() {
        return window.location.href;
      }
    }
  },
  link: {
    canonical: function() {
      return window.location.href;
    }
  }
});
```

#### Use function context:
```javascript
Router.route('post', {
  template: 'post',
  path: '/post/:_id',
  meta: function() {
    return {
      keywords: {
        name: 'keywords',
        itemprop: 'keywords',
        content: function() {
          return this.data.getKeywords();
        }
      }
    };
  },
  data: {
    getKeywords: function() {
      return PostsCollection.findOne(this.params._id).keywords;
    }
  }
});
```

#### Bootstrap configuration
```javascript
Router.configure({
  meta: {
    charset: {
      charset: 'UTF-8'
    },
    keywords: {
      name: 'keywords',
      itemprop: 'keywords',
      content: 'Awesome, Meteor, based, app'
    },
    description: {
      name: 'description',
      itemprop: 'description',
      property: 'og:description',
      content: 'Default description'
    },
    image: {
      name: 'twitter:image',
      itemprop: 'image',
      property: 'og:image',
      content: 'http://doma..'
    },
    'og:type': 'website',
    'og:title': function() {
      return document.title;
    },
    'og:site_name': 'My Awesome Site',
    url: {
      property: 'og:url',
      itemprop: 'url',
      content: function() {
        return window.location.href;
      }
    },
    'twitter:card': 'summary',
    'twitter:title': function() {
      return document.title;
    },
    'twitter:description': 'Default description',
    'twitter:site': {
      name: 'twitter:site',
      value: '@twitterAccountName'
    },
    'twitter:creator': {
      name: 'twitter:creator',
      value: '@twitterAccountName'
    },
    'http-equiv': {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge,chrome=1'
    },
    robots: 'index, follow',
    google: 'notranslate'
  },
  script: {
    twbs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
  },
  link: {
    twbs: {
      href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
      rel: 'stylesheet'
    },
    canonical: function() {
      return window.location.href;
    },
    image: {
      rel: 'image',
      sizes: '500x500',
      href: 'http://doma..'
    },
    publisher: 'http://plus.google...',
    'shortcut icon': {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      href: 'http://domai...'
    },
    'icon': {
      rel: 'icon',
      type: 'image/png',
      href: 'http://domai...'
    },
    'apple-touch-icon-144': {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      href: 'http://doma..'
    },
    'apple-touch-icon-114': {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      href: 'http://doma..'
    },
    'apple-touch-icon-72': {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      href: 'http://doma..'
    },
    'apple-touch-icon-57': {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      href: 'http://doma..'
    }
  },
});
```