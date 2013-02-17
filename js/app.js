var Backbone = Backbone;
var Handlebars = Handlebars;
var APP = {};

(function() {
  if (Backbone && Handlebars) {
    // APP properties
    APP.el = $("#app");
    APP.header = $("#header", APP.el);
    APP.list = $("#images-list", APP.el);

    // console
    APP.console = {};
    APP.console.canLog = false;
    APP.console.log = function(log) {
      if (APP.console.canLog) {
        console.log(log);
      }
    };

    // template with handlebars
    APP.template = {};
    APP.template.el = $("#image-template");
    APP.template.source = APP.template.el.html();
    APP.template.compiled = Handlebars.compile(APP.template.source);

    // lightbox tempalte
    APP.el.after('<div id="lightbox"><div class="content"></div><a class="close" href="#">x</a></div>');
    APP.lightbox = {};
    APP.lightbox.container = $("#lightbox");
    APP.lightbox.content = $(".content", APP.lightbox.container);
    APP.lightbox.bt = $(".close", APP.lightbox.container);
    APP.lightbox.template = {};
    APP.lightbox.template.el = $("#lightbox-template");
    APP.lightbox.template.source = APP.lightbox.template.el.html();
    APP.lightbox.template.compiled = Handlebars.compile(APP.lightbox.template.source);
    APP.lightbox.isShown = false;
    
    APP.lightbox.open = function(context) {
      var html = APP.lightbox.template.compiled(context);
      APP.lightbox.content.html(html);
      APP.lightbox.container.height($(window).height());
      APP.lightbox.container.fadeIn(function() {
        APP.lightbox.content.animate({top: 0}, 800);
        APP.lightbox.isShown = true;
      });
    };

    APP.lightbox.close = function() {
      APP.lightbox.content.animate({top: -1000}, 800, function() {
        APP.lightbox.container.fadeOut(function() {
          APP.lightbox.content.html("");
          APP.lightbox.isShown = false;
        });
      });
    };

    $(document).keyup(function(e) {
      if (e.keyCode == 27 && APP.lightbox.isShown) {
        APP.lightbox.close();
      }
    });

    // backbone extended model
    APP.image = Backbone.Model.extend({
      initialize: function(img) {
        APP.console.log(img);
        
        var html;
        var item;
        var itemLink;
        var itemImage;

        html = APP.template.compiled(img);
        APP.list.append(html);

        item = $("#" + img.id, APP.list);
        itemLink = $("a", item);
        itemImage = $("img", item);

        itemImage.load(function() {
          APP.list.removeClass("loading");
          APP.list.height("");
          item.fadeIn(2500);
        });

        itemLink.click(function(e) {
          e.preventDefault();
          APP.lightbox.open(img);
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