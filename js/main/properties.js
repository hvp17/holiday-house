$(document).ready(function(){
  
        $.ajax({
          url: "http://localhost:3000/houses",
          dataType: "JSON"
        }).always(function(jData) {
          console.log("jData ", jData);
         $('#housesContainer').prepend(`
         <div class="row mb-5">
         <div class="col-md-6 col-lg-4 mb-4">
           <div class="property-entry h-100">
             <a href="property-details.html" class="property-thumbnail">
               <div class="offer-type-wrap">
                 <span class="offer-type bg-success">Rent</span>
               </div>
               <img src="images/img_1.jpg" alt="Image" class="img-fluid">
             </a>
             <div class="p-4 property-body">
               <a href="#" class="property-favorite"><span class="icon-heart-o"></span></a>
               <h2 class="property-title"><a href="property-details.html">853 S Lucerne Blvd</a></h2>
               <span class="property-location d-block mb-3"><span class="property-icon icon-room"></span> 853 S Lucerne Blvd Unit 101 Los Angeles, CA 90005</span>
               <strong class="property-price text-primary mb-3 d-block text-success">$2,265,500</strong>
               <ul class="property-specs-wrap mb-3 mb-lg-0">
                 <li>
                   <span class="property-specs">Beds</span>
                   <span class="property-specs-number">2 <sup>+</sup></span>
                   
                 </li>
                 <li>
                   <span class="property-specs">Baths</span>
                   <span class="property-specs-number">2</span>
                   
                 </li>
                 <li>
                   <span class="property-specs">SQ FT</span>
                   <span class="property-specs-number">5,500</span>
                   
                 </li>
               </ul>

             </div>
           </div>
         </div>
       </div>
         


             `)
        });
    
})


