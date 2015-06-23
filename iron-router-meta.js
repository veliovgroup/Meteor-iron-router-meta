"use strict";
/*global Router:false */
/*global _:false */
/*global $:false */
var addMeta = function(name, settings){
  if(_.isString(settings) || _.isFunction(settings)){
    if(_.isFunction(settings)){
      settings = settings.call(this);
    }
    if(settings){
      if($('head').has('meta[name="' + name + '"]')[0]){
        $('meta[name="' + name + '"]').attr('content', settings);
      }else{
        $('head').prepend('<meta name="' + name + '" content="' + settings + '">');
      }
    }

  }else if(_.isObject(settings)){
    if($('head').has('meta[metaName="' + name + '"]')[0]){
      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        if(content){
          $('meta[metaName="' + name + '"]').attr(attrName, content);
        }
      });

    }else{
      var element = $('<meta metaName="' + name + '">');

      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        if(content){
          element.attr(attrName, content);
        }
      });

      $('head').prepend(element);
    }
  }
};

var addLink = function(name, settings){

  if(_.isString(settings) || _.isFunction(settings)){
    if(_.isFunction(settings)){
      settings = settings.call(this);
    }

    if(settings){
      if($('head').has('link[rel="' + name + '"]')[0]){
        $('link[rel="' + name + '"]').attr('href', settings);
      }else{
        $('head').prepend('<link rel="' + name + '" href="' + settings + '">');
      }
    }

  }else if(_.isObject(settings)){
    if($('head').has('link[linkName="' + name + '"]')[0]){
      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        if(content){
          $('link[linkName="' + name + '"]').attr(attrName, content);
        }
      });

    }else{
      var element = $('<link linkName="' + name + '">');

      _.each(settings, function(content, attrName){
        if(_.isFunction(content)){
          content = content.call(this);
        }
        if(content){
          element.attr(attrName, content);
        }
      });

      $('head').prepend(element);
    }
  }
};

Router.onAfterAction(function(){
  var self = this;
  var opts = ["meta", "link"];
  var configs = [Router.options, self.route.options];
  var opt  = {};
  _.each(opts, function(name){
    opt[name] = false;

    _.each(configs, function(config){
      config = _.clone(config);
      if(_.has(config, name)){
        if(_.isFunction(config[name])){
          config[name] = config[name].call(self);
        }
        if(!opt[name]){
          opt[name] = {};
        }
        _.each(config[name], function(prop, propName){
          if(_.isFunction(prop)){
            prop = prop.call(self);
          }
          if(prop){
            opt[name][propName] = prop;
          }
        });
      }
    });

    if(opt[name]){
      _.each(opt[name], function(settings, prop){
        if(name === 'meta'){
          addMeta.call(self, prop, settings);
        }else if(name === 'link'){
          addLink.call(self, prop, settings);
        }
      });
    }
  });
});