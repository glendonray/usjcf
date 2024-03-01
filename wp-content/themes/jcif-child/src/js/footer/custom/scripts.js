var waitForEl = function (selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function () {
      waitForEl(selector, callback);
    }, 100);
  }
};

waitForEl(".wpgmza_infowindow_description", function () {
  jQuery(document).ready(function ($) {
    $(".wpgmza_infowindow_description").html(
      $(".wpgmza_infowindow_description").text().substring(0, 130) + "..."
    );
    $(".wpgmza_map").click(function () {
      $(".wpgmza_infowindow_description").html(
        $(".wpgmza_infowindow_description").text().substring(0, 130) + "..."
      );
    });
  });
});
