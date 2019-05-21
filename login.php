<?php
$sCss = 'login.css';
require_once __DIR__.'/component/top.php'?>
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
							<p>Please fill with your details</p>
							<div class="form-row">
							</div>
							<div class="form-row">
								<div class="form-holder">
									<input type="text" placeholder="Your Email" class="form-control" name="email">
								</div>
								<div class="form-holder">
									<input type="password" placeholder="Password" class="form-control" name="password">
								</div>
							</div>
							<div class="form-row">
								<div class="form-holder">
									<input type="password" placeholder="Confirm Password" class="form-control">
								</div>

							</div>
                            <button id="btnLogin" class="">Login</button>

						</div>
					</div>
                </section>
            </form>
        </div>
<?php
$sScript = 'login.js';
require_once __DIR__.'/component/bottom.php'?>