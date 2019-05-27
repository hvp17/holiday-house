$(document).ready(function(){
  
  function isFamilyFriendly(house) {
    if (house.family_friendly == 1) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  function isSmokerFriendly(house) {
    if (house.smoker_friendly == 1) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  $.ajax({
    url: "http://localhost:3000/houses",
    dataType: "JSON"
  }).always(function(jData) {
    let houses = jData.houses
    console.log(houses)
    houses.forEach(house => {
      $('#housesContainer').append(`   
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="property-entry h-100">
            <a href="property-details.php?id=${house.id}" class="property-thumbnail">
              <img src="images/img_1.jpg" alt="Image" class="img-fluid">
            </a>
            <div class="p-4 property-body">
              <h2 class="property-title"><a href="property-details.html">${house.title}</a></h2>
              <span class="property-location d-block mb-3"><span class="property-icon icon-room"></span>${house.address}</span>
              <strong class="property-price text-primary mb-3 d-block text-success">${house.price_per_night} DKK/night</strong>
              <ul class="property-specs-wrap mb-3 mb-lg-0">
                <li>
                  <span class="property-specs">Rooms</span>
                  <span class="property-specs-number">${house.rooms}</span>  
                </li>
                <li>
                  <span class="property-specs">Family friendly</span>
                  <span class="property-specs-number">${isFamilyFriendly(house)}</span>
                </li>
                <li>
                  <span class="property-specs">Smoker friendly</span>
                  <span class="property-specs-number">${isSmokerFriendly(house)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>`);
    });
  });
    
});