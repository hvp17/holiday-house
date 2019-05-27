      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="mb-5">
                <h3 class="footer-heading mb-4">About HolidayHouse</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe pariatur reprehenderit vero atque, consequatur id ratione, et non dignissimos culpa? Ut veritatis, quos illum totam quis blanditiis, minima minus odio!</p>
              </div>
            </div>
            <div class="col-lg-4 mb-5 mb-lg-0">
              <div class="row mb-5">
                <div class="col-md-12">
                  <h3 class="footer-heading mb-4">Navigations</h3>
                </div>
                <div class="col-md-6 col-lg-6">
                  <ul class="list-unstyled">
                    <li><a href="properties.php">Properties</a></li>
                    <li class="loggedin1"></li>
                    <li class="loggedin2"></li>
                    <li class="loggedin3 logout"></li>
                  </ul>
                </div>
                <div class="col-md-6 col-lg-6">
                <ul class="list-unstyled">
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms</a></li>
                </ul>
              </div>
            </div>
            </div>
              <div class="col-lg-4 mb-5 mb-lg-0">
                <h3 class="footer-heading mb-4">Follow Us</h3>
                <div>
                  <a href="#" class="pl-0 pr-3"><span class="icon-facebook"></span></a>
                  <a href="#" class="pl-3 pr-3"><span class="icon-twitter"></span></a>
                  <a href="#" class="pl-3 pr-3"><span class="icon-instagram"></span></a>
                  <a href="#" class="pl-3 pr-3"><span class="icon-linkedin"></span></a>
                </div>
              </div>
            </div>
            <div class="row pt-5 mt-5 text-center">
              <div class="col-md-12">
              <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | A Team</p>
            </div>
          </div>
        </div>
      </footer>
    </div>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script>
      var token = window.localStorage.getItem('token')
      if (token) {
        $('.loggedin1').append(`
        <a href="list-house.php">List House</a>
        `)
        $('.loggedin2').append(`
        <a href="account.php">Account</a>
        `)
        $('.loggedin3').append(`
        <a id="logout">Log out</a>
        `)
        $(document).on('click', '#logout', function(){
          localStorage.clear();
          location.reload();
        })
        
        } else {
        $('.loggedin1').append(`
        <a href="signup.php">Signup</a>
        `)
        $('.loggedin2').append(`
        <a href="login.php">Login</a>
        `)
      }
    </script>

    <script src="js/jquery-migrate-3.0.1.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/mediaelement-and-player.min.js"></script>
    <script src="js/jquery.stellar.min.js"></script>
    <script src="js/jquery.countdown.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/bootstrap-datepicker.min.js"></script>
    <script src="js/aos.js"></script>

    <script src="js/main.js"></script>
    <!-- SIGN UP-->
    <script src="js/jquery.steps.js"></script>
    <!-- SIGN UP END -->
    <?php if (isset($sScript)) : ?>
      <script src="js/main/<?= $sScript ?>"></script>
    <?php endif; ?>

    <?php if (isset($searchScript)) : ?>
      <script src="js/main/search.js"></script>
    <?php endif; ?>
  </body>
</html>