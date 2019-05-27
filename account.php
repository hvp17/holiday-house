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
            <h1 class="mb-2">Account</h1>
          </div>
        </div>
      </div>
    </div>


<?php 
  $sScript = 'list-house.js';
require_once __DIR__.'/component/bottom.php'?>