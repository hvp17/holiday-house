$(document).ready(function() {
  function isFamilyFriendly(house) {
    if (house.family_friendly == 1) {
      return "Yes";
    } else {
      return "No";
    }
  }

  function isSmokerFriendly(house) {
    if (house.smoker_friendly == 1) {
      return "Yes";
    } else {
      return "No";
    }
  }

  let date = document.getElementById("select-date");
  date.addEventListener("change", () => {
    let dateValue = date.value;
    dateValue = dateValue.split("-");
    timeStamp = new Date(dateValue).getTime();
    // console.log(timeStamp);

    let dateClassItems = document.querySelectorAll(".date-class");
    dateClassItems.forEach(dateClassItem => {
      let dataValue = $(dateClassItem).data("date");
      let parent = $(dateClassItem).parent();
      if (timeStamp > dataValue == true) {
        $(parent).hide();
      } else if (timeStamp > dataValue == false) {
        $(parent).show();
      }
    });
  });

  function convertTimeStamp(date) {
    return new Date(date).getTime();
  }

  let roomsSelect = document.getElementById("select-rooms");
  roomsSelect.addEventListener("change", () => {
    let roomsSelectValue = roomsSelect[roomsSelect.selectedIndex].value;
    let roomsClassItems = document.querySelectorAll(".rooms-class");
    roomsClassItems.forEach(roomsClassItem => {
      let dataValue = $(roomsClassItem).data("rooms");
      let parent = $(roomsClassItem).parent();
      if (roomsSelectValue > dataValue) {
        $(parent).hide();
      } else if (roomsSelectValue < dataValue) {
        $(parent).show();
      }
    });
  });

  let typeSelect = document.getElementById("list-types");
  typeSelect.addEventListener("change", () => {
    let typesSelectValue = typeSelect[typeSelect.selectedIndex].value;
    let typesClassItems = document.querySelectorAll(".type-class");
    typesClassItems.forEach(typesClassItem => {
      console.log(typesClassItem);
      let dataValue = $(typesClassItem).data("type");
      let parent = $(typesClassItem).parent();
      console.log(typesSelectValue, dataValue);
      if (Number(typesSelectValue) === dataValue) {
        $(parent).show();
      } else if (typesSelectValue === "All") {
        $(parent).show();
      } else {
        $(parent).hide();
      }
    });
  });

  $.ajax({
    url: "http://localhost:3000/filters/getTypes",
    dataType: "JSON"
  }).always(function(jTypeData) {
    let { status, types } = jTypeData;
    types.forEach(type => {
      $("#list-types").append(`
         <option value="${type.id}">${type.name}</option>
      `);
    });
  });

  $.ajax({
    url: "http://localhost:3000/houses",
    dataType: "JSON"
  }).always(function(jData) {
    let houses = jData.houses;
    houses.forEach(house => {
      $.ajax({
        url: "http://localhost:3000/images/getHouseImages/" + house.id,
        dataType: "JSON"
      }).always(function(jImagesData) {
        const { status, images } = jImagesData;
        const firstThumbnail = images.find(x => x.path.includes("thumbnail"));
        $("#housesContainer").append(`   
        <div class="col-md-6 col-lg-4 mb-4 item" data-price="${
          house.price_per_night
        }">
          <div class="property-entry h-100 date-class rooms-class type-class" data-date="${convertTimeStamp(
            house.start_date
          )}" data-rooms="${house.rooms}" data-type="${house.type_fk}">
            <a href="property-details.php?id=${
              house.id
            }" class="property-thumbnail">
              <img src="${firstThumbnail.path}" alt="Image" class="img-fluid">
            </a>
            <div class="p-4 property-body">
              <h2 class="property-title"><a href="property-details.html">${
                house.title
              }</a></h2>
              <span class="property-location d-block mb-3"><span class="property-icon icon-room"></span>${
                house.address
              }</span>
              <strong class="property-price text-primary mb-3 d-block text-success">${
                house.price_per_night
              } DKK/night</strong>
              <ul class="property-specs-wrap mb-3 mb-lg-0">
                <li>
                  <span class="property-specs">Rooms</span>
                  <span class="property-specs-number">${house.rooms}</span>  
                </li>
                <li>
                  <span class="property-specs">Family friendly</span>
                  <span class="familyFriendly" data-family="${
                    house.family_friendly
                  }">${isFamilyFriendly(house)}</span>
                </li>
                <li>
                  <span class="property-specs">Smoker friendly</span>
                  <span class="smokerFriendly" data-smoker="${
                    house.smoker_friendly
                  }">${isSmokerFriendly(house)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>`);
      });
    });
  });

  let familyFriendlyFilter = document.getElementById("btnFamily");

  familyFriendlyFilter.addEventListener("click", () => {
    let smokerFriendlyElements = document.querySelectorAll(".smokerFriendly");
    smokerFriendlyElements.forEach(smokerFriendlyElement => {
      let value = smokerFriendlyElement.dataset.smoker;
      if (value == 0) {
        let parent = smokerFriendlyElement.closest(".item");
        console.log(parent);
        $(parent).toggle();
      }
    });
  });

  let smokerFriendlyFilter = document.getElementById("btnSmoker");

  smokerFriendlyFilter.addEventListener("click", () => {
    let familyFriendlyElements = document.querySelectorAll(".familyFriendly");
    familyFriendlyElements.forEach(familyFriendlyElement => {
      let value = familyFriendlyElement.dataset.family;
      if (value == 0) {
        let parent = familyFriendlyElement.closest(".item");
        console.log(parent);
        $(parent).toggle();
      }
    });
  });

  $(document).on("change", ".select-price", function() {
    let sortingMethod = $(this).val();
    if (sortingMethod == "l2h") {
      sortProductsPriceAscending();
    } else if (sortingMethod == "h2l") {
      sortProductsPriceDescending();
    }
  });

  function sortProductsPriceAscending() {
    let houses = $(".item");
    houses.sort(function(a, b) {
      return $(a).data("price") - $(b).data("price");
    });
    $("#housesContainer").html(houses);
  }

  function sortProductsPriceDescending() {
    let houses = $(".item");
    houses.sort(function(a, b) {
      return $(b).data("price") - $(a).data("price");
    });
    $("#housesContainer").html(houses);
  }
});
