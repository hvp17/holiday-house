<?php
$sCss = 'login.css';
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
                    <div class="inner login">
						<div class="form-content" >
							<div class="form-header">
								<h3>Login</h3>
							</div>
							<p>Please fill your details in</p>
							<div class="form-row">
							</div>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Your Email" class="form-control" name="txtEmail">
								</div>
								<div class="form-holder">
									<input type="password" placeholder="Password" class="form-control" name="txtPassword">
								</div>
							</div>
			
                            <button id="btnLogin" type="button" class="">Login</button>

						</div>
					</div>
                </section>
            </form>
        </div>
<?php
$sScript = 'login.js';
require_once __DIR__.'/component/bottom.php'?>