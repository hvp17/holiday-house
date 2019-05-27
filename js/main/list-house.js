// Insert house with images
$(document).on("click", 'a[href="#finish"]', function() {
  var data = $("#frmListHouse").serialize();
  console.log(data);
  var imageFiles = $("#image")[0].files;
  console.log("imageFiles ", imageFiles);
  $.ajax({
    url: "http://localhost:3000/houses/create",
    data: { data: data, imageFiles: imageFiles },
    method: "POST",
    dataType: "JSON"
  }).always(function(jData) {
    console.log("jData ", jData);
  });
});

$(function() {
  $("#frmListHouse").steps({
    headerTag: "h2",
    bodyTag: "section",
    transitionEffect: "fade",
    enableAllSteps: true,
    transitionEffectSpeed: 500,
    labels: {
      finish: "Submit",
      next: "Forward",
      previous: "Backward"
    }
  });
  $(".wizard > .steps li a").click(function() {
    $(this)
      .parent()
      .addClass("checked");
    $(this)
      .parent()
      .prevAll()
      .addClass("checked");
    $(this)
      .parent()
      .nextAll()
      .removeClass("checked");
  });
  // Custome Jquery Step Button
  $(".forward").click(function() {
    $("#frmListHouse").steps("next");
  });
  $(".backward").click(function() {
    $("#frmListHouse").steps("previous");
  });
  // Select Dropdown
  $("html").click(function() {
    $(".select .dropdown").hide();
  });
  $(".select").click(function(event) {
    event.stopPropagation();
  });
  $(".select .select-control").click(function() {
    $(this)
      .parent()
      .next()
      .toggle();
  });
  $(".select .dropdown li").click(function() {
    $(this)
      .parent()
      .toggle();
    var text = $(this).attr("rel");
    $(this)
      .parent()
      .prev()
      .find("div")
      .text(text);
  });
});