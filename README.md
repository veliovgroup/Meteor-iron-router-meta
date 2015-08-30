Reactive meta tags and CSS for meteor within iron-router
========
Change meta tags on the fly within [iron-router](https://atmospherejs.com/iron/router). This package can create `meta` tags, and `link` tags as well.

This package may also help to use dynamic CSSs, so you may use different style sheets - for different routes.

This package supports `meta` and `link` options (properties) defined on objects below, ordered by prioritization:
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
##### [iron-router-meta.meteor.com](http://iron-router-meta.meteor.com)

Usage:
========

Change CSS per route:
```coffeescript
# Set default CSS for all routes
Router.configure
  link:
    stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css"

# Rewrite default CSS, for second route, via controller:
secondPageController = RouteController.extend
  link:
    stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
Router.route 'secondPage', controller: secondPageController

# Rewrite default CSS, for third route via route settings:
@route 'thirdPage', 
  link:
    stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha/css/bootstrap.min.css"
```

Set default values in `Router.configure()`
```coffeescript
Router.configure
  meta:
    charset:
      charset: 'UTF-8'
    keywords: 
      name: 'keywords'
      itemprop: 'keywords'
      content: 'Awesome, Meteor, based, app'
    robots: 'index, follow'
    google: 'notranslate'

  link:
    canonical: ->
      window.location.href
    image:
      rel: 'image'
      sizes: '500x500'
      href: 'http://doma..'
    publisher: 'http://plus.google...'
```

Then override default values in each route:
```coffeescript
Router.route 'account',
  template: 'account'
  path: '/me/account'
  title: 'My Account'
  meta:
    keywords: 
      name: 'keywords'
      itemprop: 'keywords'
      content: 'User, Account'
```

Set tags via `RouteController`:
```coffeescript
LocationController = RouteController.extend(meta: keywords: 'User, Account')
Router.route 'locations', controller: LocationController
```

Set only `name` and `content` attributes on `meta` tag:
```coffeescript
Router.route 'routeName',
  meta:
    name: 'content'
```

Set only `rel` and `href` attributes on `link` tag:
```coffeescript
Router.route 'routeName',
  link:
    rel: 'href'
```

Set multiple attributes on `meta` tag:
```coffeescript
Router.route 'routeName',
  meta:
    uniqueName: 
      name: 'name'
      content: 'content'
      value: 'value'
      'og:prop': 'value'
      itemprop: 'value'
```

Set multiple attributes on `link` tag:
```coffeescript
Router.route 'routeName',
  link:
    uniqueName: 
      rel: 'name'
      sizes: 'value'
      href: 'value'
      type: 'value'
```

You can pass functions as value:
```coffeescript
Router.route 'routeName',
  meta:
    url:
      property: 'og:url'
      itemprop: 'url'
      content: ->
        window.location.href
  link:
    canonical: ->
      window.location.href
```

Use function context:
```coffeescript
Router.route 'post',
  template: 'post'
  path: '/post/:_id'
  meta: ->
    keywords: 
      name: 'keywords'
      itemprop: 'keywords'
      content: ->
        @data.getKeywords()
  data:
    getKeywords: ->
      Collection.Posts.findOne(@params._id).keywords
```

#### Sample config
```coffeescript
Router.configure
  meta:
    # <meta charset="UTF-8">
    charset:
      charset: 'UTF-8'

    # <meta name="keywords" content="Awes..">
    keywords: 
      name: 'keywords'
      itemprop: 'keywords'
      content: 'Awesome, Meteor, based, app' 
    
    # <meta name="description" itemprop="description" property="og:description" content="Default desc..">
    description:
      name: 'description'
      itemprop: 'description'
      property: 'og:description'
      content:  'Default description'

    image:
      name: 'twitter:image'
      itemprop: 'image'
      property: 'og:image'
      content: 'http://doma..'

    'og:type': 'website'
    'og:title': ->
      document.title
    'og:site_name': 'My Awesome Site'

    url:
      property: 'og:url'
      itemprop: 'url'
      content: ->
        window.location.href

    'twitter:card': 'summary'
    'twitter:title': ->
      document.title
    'twitter:description': 'Default description'
    'twitter:site': 
      name: 'twitter:site'
      value: '@twitterAccountName'
    'twitter:creator': 
      name: 'twitter:creator'
      value: '@twitterAccountName'

    'http-equiv':
      'http-equiv': 'X-UA-Compatible'
      content: 'IE=edge,chrome=1'

    robots: 'index, follow'
    google: 'notranslate'
  

  link:
    # <link href="https://maxcdn.bootstrapcdn.com/..." rel="stylesheet">
    stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css"

    # <link rel="canonical" href="http://doma..">
    canonical: ->
      window.location.href

    # <link rel="image" sizes="500x500" href="http://doma..">
    image:
      rel: 'image'
      sizes: '500x500'
      href: 'http://doma..'

    publisher: 'http://plus.google...'

    'shortcut icon':
      rel: 'shortcut icon'
      type: 'image/x-icon'
      href: 'http://domai...'

    'icon':
      rel: 'icon'
      type: 'image/png'
      href: 'http://domai...'

    'apple-touch-icon-144':
      rel: 'apple-touch-icon'
      sizes: '144x144'
      href: 'http://doma..'
    'apple-touch-icon-114':
      rel: 'apple-touch-icon'
      sizes: '114x114'
      href: 'http://doma..'
    'apple-touch-icon-72':
      rel: 'apple-touch-icon'
      sizes: '72x72'
      href: 'http://doma..'
    'apple-touch-icon-57':
      rel: 'apple-touch-icon'
      sizes: '57x57'
      href: 'http://doma..'
```