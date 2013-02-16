var Backbone = Backbone;
var Handlebars = Handlebars;
var APP = {};

(function() {
  if (Backbone && Handlebars) {
    // APP properties
    APP.header = $("#header");
    APP.list = $("#images-list");

    // template with handlebars
    APP.template = {};
    APP.template.el = $("#image-template");
    APP.template.source = APP.template.el.html();
    APP.template.compiled = Handlebars.compile(APP.template.source);

    // console
    APP.console = {};
    APP.console.canLog = false;
    APP.console.log = function(log) {
      if (APP.console.canLog) {
        console.log(log);
      }
    };

    // backbone extended model
    APP.image = Backbone.Model.extend({
      initialize: function(img) {
        APP.console.log(img);
        
        var html;
        var item;

        html = APP.template.compiled(img);
        APP.list.append(html);
        item = $("#" + img.id, APP.list);
        itemImage = $("img", item);
        itemImage.load(function() {
          APP.list.removeClass("loading");
          APP.list.height("");
          item.fadeIn(2500);
        });
      }
    });

    // backbone extended collection
    APP.images = Backbone.Collection.extend({
      model: APP.image,
      url: "get_images.php"
    });
  }
}());