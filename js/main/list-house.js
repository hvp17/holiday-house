// Get token for session
$(document).ready(function() {
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader("x-token", window.localStorage.getItem("token"));
    }
  });

  // Display different types of houses
  $.ajax({
    url: "http://localhost:3000/filters/getTypes",
    dataType: "JSON"
  }).always(function(jTypeData) {
    let { status, types } = jTypeData;
    types.forEach(type => {
      $("#type-select").append(`
         <option name="type" value="${type.id}">${type.name}</option>
      `);
    });
  });
});

// Insert house with images
$(document).on("click", 'a[href="#finish"]', function() {
  var formData = $("#frmListHouse").serializeArray();
  var obj = {};

  // Convert data to json object
  for (var a = 0; a < formData.length; a++) {
    obj[formData[a].name] = formData[a].value;
  }
  var jsonData = JSON.stringify(obj);

  var file_data = $("#image")[0].files;
  var form_data = new FormData($("#frmListHouse"));

  // Store all images to form_data
  for (var i = 0; i < file_data.length; i++) {
    form_data.append("images[]", file_data[i]);
  }

  // Add all data (previously specified) from the form to form_data
  form_data.append("form_values", jsonData);

  $.ajax({
    url: "http://localhost:3000/houses/create",
    method: "POST",
    data: form_data,
    processData: false,
    contentType: false,
    type: "POST",
    success: function(data) {
      window.location.href = "/properties.php";
      alert("success", data);
    }
  }).always(function(jData) {});
});

// Form interface interaction
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
