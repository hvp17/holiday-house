<?php
$sCss = 'signup.css';
require_once __DIR__.'/component/top.php'?>
<script>
	  var token = window.localStorage.getItem('token')
	  if(!token){
		window.location.assign("/login.php")
	  }
</script>
<div class="site-blocks-cover inner-page-cover overlay" style="background-image: url(images/hero_bg_2.jpg);" data-aos="fade" data-stellar-background-ratio="0.5">
      <div class="container">
        <div class="row align-items-center justify-content-center text-center">
          <div class="col-md-10">
            <h1 class="mb-2">List Your House</h1>
          </div>
        </div>
      </div>
    </div>


    <div class="wrapper">
            <form id="frmListHouse">
        		<!-- SECTION 1  -->
                <h2></h2>
                <section>
                    <div class="inner">
						<div class="image-holder">
							<img src="images/form-wizard-1.jpg" alt="">
						</div>
						<div class="form-content" >
							<div class="form-header">
								<h3>List House</h3>
							</div>
							<p>Please fill with your details</p>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Title" class="form-control" name="txtTitle">
								</div>
								<div class="form-holder">
									<input type="text" placeholder="Price" class="form-control" name="txtPrice">
								</div>
							</div>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Description" class="form-control" name="txtDescription">
								</div>
							</div>
						
					
					
						</div>
					</div>
                </section>

				 <!-- SECTION 2  -->
                <h2></h2>
                <section>
                    <div class="inner">
						<div class="image-holder">
							<img src="images/form-wizard-2.jpg" alt="">
						</div>
						<div class="form-content">
							<div class="form-header">
								<h3><b>List House</b></h3>
							</div>
							<p>Please fill with additional info</p>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Address" class="form-control" name="txtAddress">
								</div>
							
							</div>
							<div class="form-row">
								<div class="form-holder">
									<select name="txtHouseType" id="type-select" class="form-control">
									</select>
								</div>
							</div>
							<div class="form-row">
								<div class="form-holder">
								
                                    <select name="txtRooms" class="form-control">
                                        <option name="rooms" value="1">1 Room</option>
                                        <option name="rooms" value="2">2 Rooms</option>
                                        <option name="rooms" value="3">3 Rooms </option>
                                        <option name="rooms" value="4">4 Rooms </option>
                                        <option name="rooms" value="5">5 Rooms </option>
                                        <option name="rooms" value="6">6 Rooms </option>
                                        <option name="rooms" value="7">7 Rooms </option>
                                        <option name="rooms" value="8">8 Rooms </option>
                                        <option name="rooms" value="9">9 Rooms </option>
                                    </select>
								</div>
							</div>
							
						</div>
					</div>
                </section>
				 <!-- SECTION 3 -->
                <h2></h2>
				<section>
					<div class="inner">
						<div class="image-holder">
							<img src="images/form-wizard-2.jpg" alt="">
						</div>
						<div class="form-content">
							<div class="form-header">
								<h3><b>List House</b></h3>
							</div>
							<p>Please fill with additional info</p>
							<div class="form-row">
								<div class="form-holder">
									Family Friendly
									<input type="checkbox" class="form-control" name="txtFamily">
									Smoker Friendly
									<input type="checkbox" class="form-control" name="txtSmoker">
								</div>
							</div>
						</div>
					</div>
				</section>

                <!-- SECTION 4  -->
                <h2></h2>
                <section>
                    <div class="inner">
						<div class="image-holder">
							<img src="images/form-wizard-3.jpg" alt="">
						</div>
						<div class="form-content">
							<div class="form-header">
								<h3>List House</h3>
							</div>
							<p>Please fill with additional info</p>
						
							<div class="form-row">
                            Start date
								<div class="form-holder">
									<input type="date" class="form-control" name="txtStartDate">
								</div>
							</div>
							<div class="form-row">
                            End Date
								<div class="form-holder">
									<input type="date" class="form-control" name="txtEndDate">
								</div>
							</div>
						</div>
					</div>
                </section> 
                <!-- SECTION 5 -->
                <h2></h2>
                <section>
                    <div class="inner">
						<div class="image-holder">
							<img src="images/form-wizard-3.jpg" alt="">
						</div>
						<div class="form-content">
							<div class="form-header">
								<h3>List House</h3>
							</div>
							<p>Please upload at least 1 image of your listing</p>
						
							<div class="form-row">
								<div class="form-holder images">
									<input type="file" id="image" multiple accept=".jpg, .jpeg, .png" class="form-control" name="image[]">
								
								</div>
							</div>
							
						</div>
					</div>
                </section>
            </form>
        </div>


<?php 
  $sScript = 'list-house.js';
require_once __DIR__.'/component/bottom.php'?>