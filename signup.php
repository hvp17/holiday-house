<?php
$sCss = 'signup.css';
require_once __DIR__.'/component/top.php'?>
<script>
	  var token = window.localStorage.getItem('token')
	  if(token){
		window.location.assign("/")
	  }
</script>
<div class="wrapper">
            <form id="wizard">
        		<!-- SECTION 1 -->
                <h2></h2>
                <section>
                    <div class="inner">
						<div class="image-holder">
							<img src="images/form-wizard-1.jpg" alt="">
						</div>
						<div class="form-content" >
							<div class="form-header">
								<h3>Registration</h3>
							</div>
							<p>Please fill with your details</p>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Name" class="form-control" name="name">
								</div>
							</div>
						
					
					
						</div>
					</div>
                </section>

				<!-- SECTION 2 -->
                <h2></h2>
                <section>
                    <div class="inner">
						<div class="image-holder">
							<img src="images/form-wizard-2.jpg" alt="">
						</div>
						<div class="form-content">
							<div class="form-header">
								<h3><b>Registration</b></h3>
							</div>
							<p>Please fill with additional info</p>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Email" class="form-control" name="email">
								</div>
							</div>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Phone" class="form-control" name="phone">
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
							<img src="images/form-wizard-3.jpg" alt="">
						</div>
						<div class="form-content">
							<div class="form-header">
								<h3>Registration</h3>
							</div>
							<p>Please fill with additional info</p>
						
							<div class="form-row">
								<div class="form-holder">
									<input type="password" placeholder="Password" class="form-control" name="password">
								</div>
							</div>
						</div>
					</div>
                </section>
            </form>
        </div>
<?php
$sScript = 'signup.js';
require_once __DIR__.'/component/bottom.php'?>