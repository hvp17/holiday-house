<div class="site-section site-section-sm pb-0">
      <div class="container">
        <div class="row">
          <form class="form-search col-md-12 frmSearch" style="margin-top: -100px;">
            <div class="row  align-items-end">
              <div class="col-md-3">
                <label for="list-types">Listing Types</label>
                <div class="select-wrap">
                  <span class="icon icon-arrow_drop_down"></span>
                  <select name="list-types" id="list-types" class="form-control d-block rounded-0">
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="sommerHouse">Sommerhouse</option>
                  </select>
                </div>
              </div>
              
             
              <div class="col-md-3">
                <label for="select-city">Select City</label>
                <div class="select-wrap">
                  <span class="icon icon-arrow_drop_down"></span>
                  <select name="select-city" id="select-city" class="form-control d-block rounded-0">
                    <option value="copenhagen">Copenhagen</option>
                    <option value="aarhus">Aarhus</option>
                    <option value="odense">Odense</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <label for="select-city">Date</label>
                <div class="select-wrap">
                  <span class="icon"></span>
                  <input name="select-date" id="select-date" type="date" class="form-control d-block rounded-0">
               
                </div>
              </div>
              <div class="col-md-3">
                <button type="button" class="btn btn-success text-white btn-block rounded-0 btnSearch">Search </button>
              </div>
            </div>
          </form>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="view-options bg-white py-3 px-3 d-md-flex align-items-center">
              <div class="mr-auto">
                <span class="col-md-2"> <button type="button" class="btn tag" id="btnFamily">Family Friendly</button></span>
                <span class="col-md-2"> <button type="button" class="btn tag" id="btnSmoker">Smoker Friendly</button></span>
              </div>
              <div class="ml-auto d-flex align-items-center">
                <div class="select-wrap">
                  <span class="icon icon-arrow_drop_down"></span>
                  <select class="form-control form-control-sm d-block rounded-0 select-price">
                    <option value="">Sort by price</option>
                    <option value="l2h">Price Ascending</option>
                    <option value="h2l">Price Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<?php
$searchScript = true;
?>