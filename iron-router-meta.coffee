class IronRouterMeta extends IronRouterHelper
  constructor: (@router) -> 
    super @router
    @router.onAfterAction =>
      $('[data-link-name], [data-meta-name], [data-script-name]').remove()

      tags = []
      tags.push @router.options.meta if @router?.options?.meta
      tags.push @currentController::['meta'] if @currentController?.prototype and _.has(@currentController::, 'meta')
      tags.push @currentRoute.route.options.meta if @currentRoute?.route?.options?.meta
      @addTag tags if tags.length

      links = []
      links.push @router.options.link if @router?.options?.link
      links.push @currentController::['link'] if @currentController?.prototype and _.has(@currentController::, 'link')
      links.push @currentRoute.route.options.link if @currentRoute?.route?.options?.link
      @addLink links if links.length

      scripts = []
      scripts.push @router.options.script if @router?.options?.script
      scripts.push @currentController::['script'] if @currentController?.prototype and _.has(@currentController::, 'script')
      scripts.push @currentRoute.route.options.script if @currentRoute?.route?.options?.script
      @addScript scripts if scripts.length

  updateNode: (type, name, values, isClosing = false) ->
    if $('head').has(type + '[data-' + type + '-name="' + name + '"]')[0]
      $(type + '[data-' + type + '-name="' + name + '"]').remove() 

    if isClosing
      element = $ '<' + type + ' data-' + type + '-name="' + name + '"></' + type + '>'
    else
      element = $ '<' + type + ' data-' + type + '-name="' + name + '" />'
    for attrName, content of values
      content = content.call @currentRoute if _.isFunction content
      element.attr attrName, content if content
    $('head').prepend element

  _prepare: (settings) ->
    _settings = {}
    for set in settings
      if _.isFunction set
        _settings = _.extend(_settings, set.call(@currentRoute))
      else if _.isObject set
        _settings = _.extend(_settings, set)
    return _settings

  addTag: (settings) ->
    _settings = @_prepare settings

    for name, values of _settings
      values = values.call @currentRoute if _.isFunction values
      values = {content: values, name: name} if _.isString values
      @updateNode 'meta', name, values

  addLink: (settings) ->
    _settings = @_prepare settings

    for name, values of _settings
      values = values.call @currentRoute if _.isFunction values
      values = {href: values, rel: name} if _.isString values
      @updateNode 'link', name, values

  addScript: (settings) ->
    _settings = @_prepare settings

    for name, values of _settings
      values = values.call @currentRoute if _.isFunction values
      values = {src: values, type: 'text/javascript'} if _.isString values
      @updateNode 'script', name, values, true

Meteor.startup -> new IronRouterMeta Router