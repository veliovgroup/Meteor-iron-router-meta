class IronRouterMeta extends IronRouterHelper
  constructor: (@router) -> 
    super @router
    @router.onAfterAction =>
      $('[data-link-name], [data-meta-name]').remove()
      @addTag @router.options.meta if _.has @router.options, 'meta'
      @addTag @currentController::['meta'] if _.has @currentController::, 'meta'
      @addTag @currentRoute.route.options.meta if _.has @currentRoute.route.options, 'meta'

      @addLink @router.options.link if _.has @router.options, 'link'
      @addLink @currentController::['link'] if _.has @currentController::, 'link'
      @addLink @currentRoute.route.options.link if _.has @currentRoute.route.options, 'link'

  updateNode: (type, name, values) ->
    if $('head').has(type + '[data-' + type + '-name="' + name + '"]')[0]
      $(type + '[data-' + type + '-name="' + name + '"]').remove() 

    element = $ '<' + type + ' data-' + type + '-name="' + name + '">'
    for attrName, content of values
      content = content.call @currentRoute if _.isFunction content
      element.attr attrName, content if content
    $('head').prepend element

  addTag: (settings) ->
    settings = settings.call @currentRoute if _.isFunction settings
    for name, values of settings
      values = values.call @currentRoute if _.isFunction values
      values = {content: values, name: name} if _.isString values
      @updateNode 'meta', name, values

  addLink: (settings) ->
    settings = settings.call @currentRoute if _.isFunction settings
    for name, values of settings
      values = values.call @currentRoute if _.isFunction values
      values = {href: values, rel: name} if _.isString values
      @updateNode 'link', name, values

Meteor.startup -> new IronRouterMeta Router