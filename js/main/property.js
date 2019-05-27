//get url and id parameter
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("id");
console.log(c);

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

$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/houses/one/" + c,
    dataType: "JSON"
  }).always(function(jData) {
    let house = jData.house[0];
    console.log(house);

    startDate = new Date(house.start_date);
    endDate = new Date(house.end_date);

    $(
      "#housesContainerSingle"
    ).append(`<div class="site-blocks-cover inner-page-cover overlay" style="background-image: url(images/hero_bg_2.jpg);" data-aos="fade" data-stellar-background-ratio="0.5">
      <div class="container">
        <div class="row align-items-center text-left">
          <div class="col-md-10">
            <h1 class="mb-2">${house.title}</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section site-section-sm">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div>
              <div class="slide-one-item home-slider owl-carousel">
                <div><img src="images/hero_bg_1.jpg" alt="Image" class="img-fluid"></div>
                <div><img src="images/hero_bg_2.jpg" alt="Image" class="img-fluid"></div>
                <div><img src="images/hero_bg_3.jpg" alt="Image" class="img-fluid"></div>
              </div>
            </div>
            <div class="bg-white property-body border-bottom border-left border-right">
              <div class="row mb-5">
                <div class="col-md-6">
                  <strong class="text-success h1 mb-3">${
                    house.price_per_night
                  } DKK/night</strong>
                </div>
                <div class="col-md-6">
                  <ul class="property-specs-wrap mb-3 mb-lg-0  float-lg-right">
                  <li>
                    <span class="property-specs">Rooms</span>
                    <span class="property-specs-number">${house.rooms}</span>
                    
                  </li>
                  <li>
                    <span class="property-specs">Family friendly</span>
                    <span class="property-specs-number">${isFamilyFriendly(
                      house
                    )}</span>
                    
                  </li>
                  <li>
                    <span class="property-specs">Smoker friendly</span>
                    <span class="property-specs-number">${isSmokerFriendly(
                      house
                    )}</span>
                    
                  </li>
                </ul>
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
                  <span class="d-inline-block text-black mb-0 caption-text">Address</span>
                  <strong class="d-block">${house.address}</strong>
                </div>
                <div class="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
                  <span class="d-inline-block text-black mb-0 caption-text">From</span>
                  <strong class="d-block">${startDate.toLocaleDateString(
                    "da-DA"
                  )}</strong>
                </div>
                <div class="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
                  <span class="d-inline-block text-black mb-0 caption-text">To</span>
                  <strong class="d-block">${endDate.toLocaleDateString(
                    "da-DA"
                  )}</strong>
                </div>
              </div>
              <h2 class="h4 text-black">More Info</h2>
              <p>${house.description}</p>

              <div id="imagesContainer" class="row no-gutters mt-5">
              <div class="col-12">
              <h2 class="h4 text-black mb-3">Gallery</h2>
              </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">

            <div class="bg-white widget border rounded">

              <h3 class="h4 text-black widget-title mb-3">Contact Owner</h3>
              <form action="" class="form-contact-agent">
                <div class="form-group">
                  <input type="submit" id="phone" class="btn btn-primary" value="Request Your Stay">
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>`);

    $.ajax({
      url: "http://localhost:3000/images/getHouseImages/" + c,
      dataType: "JSON"
    }).always(function(jData) {
      const { status, images } = jData;
      console.log("images response: ", status, images);

      images.forEach(element => {
        $("#imagesContainer").append(`
        <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="images/img_1.jpg" class="image-popup gal-item"><img src="images/img_1.jpg" alt="Image" class="img-fluid"></a>
        </div>
        `);
      });
    });
  });
});
