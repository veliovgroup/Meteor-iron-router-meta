"use strict";
/*global Router:false */
/*global _:false */
/*global $:false */
var addMeta = function(name, settings){
  if(_.isString(settings) || _.isFunction(settings)){
    if(_.isFunction(settings)){
      settings = settings.call(this);
    }

    if($('head').has('meta[name="' + name + '"]')[0]){
      $('meta[name="' + name + '"]').attr('content', settings);
    }else{
      $('head').append('<meta name="' + name + '" content="' + settings + '">');
    }

  }else if(_.isObject(settings)){
    if($('head').has('meta[metaName="' + name + '"]')[0]){
      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        $('meta[metaName="' + name + '"]').attr(attrName, content);
      });

    }else{
      var element = $('<meta metaName="' + name + '">');

      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        element.attr(attrName, content);
      });

      $('head').append(element);
    }
  }
};

var addLink = function(name, settings){

  if(_.isString(settings) || _.isFunction(settings)){
    if(_.isFunction(settings)){
      settings = settings.call(this);
    }

    if($('head').has('link[rel="' + name + '"]')[0]){
      $('link[rel="' + name + '"]').attr('href', settings);
    }else{
      $('head').append('<link rel="' + name + '" href="' + settings + '">');
    }

  }else if(_.isObject(settings)){
    if($('head').has('link[linkName="' + name + '"]')[0]){
      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        $('link[linkName="' + name + '"]').attr(attrName, content);
      });

    }else{
      var element = $('<link linkName="' + name + '">');

      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        element.attr(attrName, content);
      });

      $('head').append(element);
    }
  }
};

Router.onAfterAction(function(){
  if(_.has(this.route.options, "meta")){
    if(!_.isUndefined(this.route.options.meta)){
      _.each(this.route.options.meta, function(settings, name){
        addMeta.call(this, name, settings);
      });
    }
  }else if(_.has(Router.options, "meta")){
    if(!_.isUndefined(Router.options.meta)){
      _.each(Router.options.meta, function(settings, name){
        addMeta.call(this, name, settings);
      });
    }
  }

  if(_.has(this.route.options, "link")){
    if(!_.isUndefined(this.route.options.link)){
      _.each(this.route.options.link, function(settings, name){
        addLink.call(this, name, settings);
      });
    }
  }else if(_.has(Router.options, "link")){
    if(!_.isUndefined(Router.options.link)){
      _.each(Router.options.link, function(settings, name){
        addLink(name, settings);
      });
    }
  }
});