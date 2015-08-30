# Due to some Iron-router's bugs, to get current URL we use this hack:
getCurrentURL = ->
  url = Router.current().url
  url = Router.current().url.replace location.origin, ''
  return "#{location.origin}#{url}"

Router.configure
  layoutTemplate: '_layout'
  title: -> "Default Title"
  meta:
    'http-equiv':
      'http-equiv': 'X-UA-Compatible'
      content: 'IE=edge,chrome=1'
    charset:
      charset: 'UTF-8'
    robots: 'index, follow'
    google: 'notranslate'
    keywords: 
      name: 'keywords'
      itemprop: 'keywords'
      content: -> ['one', 'two', 'three', 'default', 'tags'].join ','
    description:
      name: 'description'
      itemprop: 'description'
      property: 'og:description'
      content: "Default Description"
    'og:url': ->
      property: 'og:url'
      content: -> getCurrentURL()
  link:
    canonical: ->
      rel: 'canonical'
      itemprop: 'url'
      href: -> getCurrentURL()
    image: -> "#{location.protocol}//#{location.hostname}/images/default_image.png"
    stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/2.3.2/css/bootstrap.min.css"


secondPageController = RouteController.extend
  title: "Second Page Title"
  template: 'secondPage'
  path: '/secondPage'
  meta:
    description:
      name: 'description'
      itemprop: 'description'
      property: 'og:description'
      content: "Second Page Description"
    keywords: 
      name: 'keywords'
      itemprop: 'keywords'
      content: -> ['Second', 'Page', 'tags'].join ','
  link:
    image: ->
      rel: 'image'
      sizes: '500x500'
      href: ->  "#{location.protocol}//#{location.hostname}/images/second_page_image.png"
    stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"

Router.map ->
  @route 'index',
    template: 'index'
    path: '/'

  @route 'secondPage', controller: secondPageController

  @route 'thirdPage', 
    template: 'thirdPage'
    path: '/thirdPage/:something'
    title: -> "Third Page Title > #{@params.something}"
    data: -> param: @params.something
    meta: ->
      description: ->
        name: 'description'
        itemprop: 'description'
        property: 'og:description'
        content: "Third Page Description"
      keywords: ->
        name: 'keywords'
        itemprop: 'keywords'
        content: -> ['Third', 'Page', 'tags', @params.something].join ','
    link:
      image:
        rel: 'image'
        sizes: '500x500'
        href: ->  "#{location.protocol}//#{location.hostname}/images/third_page_image_#{@params.something}.png"
      stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha/css/bootstrap.min.css"

if Meteor.isClient
  Template._layout.helpers
    rand: -> Math.floor(Random.fraction() * 10) * 5