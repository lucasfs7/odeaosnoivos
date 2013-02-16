var images;

(function() {
  APP.console.canLog = false;

  APP.list.height($(window).height() - (APP.header.height() * 2));
  
  images = new APP.images;
  images.fetch();
}());