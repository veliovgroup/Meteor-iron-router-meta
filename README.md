Reactive meta tags for meteor within iron-router
========
Change meta tags on the fly within [iron-router](https://atmospherejs.com/iron/router)

__Note__: this package implies [ostrio:iron-router-title](https://atmospherejs.com/ostrio/iron-router-title) package

Install:
========
```shell
meteor add ostrio:iron-router-meta
```

Usage:
========
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


Use function context:

```coffeescript
Router.route 'account',
  template: 'account'
  path: '/me/account'
  meta:
    keywords: 
      name: 'keywords'
      itemprop: 'keywords'
      content: ->
        this.data().getKeywords()
  data: ->
    getKeywords: ->
      Collection.Posts.findOne('someId').keywords
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