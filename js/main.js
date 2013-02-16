var images;

(function() {
  $(document).ready(function() {
    APP.console.canLog = false;

    APP.list.height($(window).height() - (APP.header.height() * 2));

    APP.lightbox.bt.click(function(e) {
      e.preventDefault();
      APP.lightbox.close();
    });

    images = new APP.images;
    images.fetch();
  });
}());