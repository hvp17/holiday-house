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
  $(".clickmeimage").on("click", function() {
    console.log($(this));
    var theGoodStuff = $(this).find(".gal-item");
    console.log(theGoodStuff);
    $.magnificPopup.open({
      items: {
        src: theGoodStuff
      },
      type: "inline"
    });
  });

  $.ajax({
    url: "http://localhost:3000/houses/one/" + c,
    dataType: "JSON"
  }).always(function(jData) {
    let house = jData.house[0];
    console.log(house);

    startDate = new Date(house.start_date);
    endDate = new Date(house.end_date);
    $("#housesContainerSingle").append(`
    <div class="site-blocks-cover inner-page-cover overlay" style="background-image: url(images/hero_bg_2.jpg);" data-aos="fade" data-stellar-background-ratio="0.5">
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
              <form id="contact-agent" action="" class="form-contact-agent">
                <button id="contact-owner-btn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Contact owner</button>
              </form>
            </div>
          </div>
          
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Interested? Get in touch</h5>
                </button>
              </div>
              <div class="modal-body">
                <p>Contact the owner:</p>
                <h4 class="modal-name"></h4>
                <a class="modal-email" href=""></a>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
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
      if (status !== 1) return;
      var siteMagnificPopup = function() {
        $(".image-popup").magnificPopup({
          type: "image",
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
          },
          image: {
            verticalFit: true
          },
          zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
          }
        });
      };

      images.forEach(image => {
        // const regex = new RegExp("[^\\]*(?=[.][a-zA-Z]+$)");
        if (!image.path.includes("thumbnail")) return;
        const bigURL = image.path.replace("thumbnail_", "");

        $("#imagesContainer").append(`
        <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="${bigURL}" class="image-popup gal-item"><img src="${
          image.path
        }" alt="Image" class="img-fluid"></a>
        </div>
        `);
      });
      siteMagnificPopup();
    });

  });
});
