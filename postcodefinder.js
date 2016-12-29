var data;
    
 var initMap = function(data)  {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.4826, lng: 0},
          zoom: 6
        });
                
     
     if(data){
            var pos = {
              lat: data['results'][0]["geometry"]["location"]["lat"],
              lng: data['results'][0]["geometry"]["location"]["lng"]
            };
         
          var marker = new google.maps.Marker({
          position: pos,
          map: map
        });
       
            map.setCenter(pos);
     }
         
      }
 
  
   var handleLocationError =  function(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }


$(document).ready(function() {

$('#search').click(function(e) {
   
    e.preventDefault();
               
$.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent($('#address').val()) + "&key=AIzaSyCSTcjnbyKeimlBc8260Tu90m-h8SRbm10",    
    type: "GET",
    success: function (data) {  
        
        if(data.status != "OK") {
            
            $("#main__searchedAddress").html('<div class="alert alert-warning" role="alert">The address could not be found.</div>')
        } else {
            
            $.each(data['results'][0]["address_components"], function(key, value) {
            
            if(value["types"][0] == "postal_code") {
                                
                $("#main__searchedAddress").html('<div class="alert alert-success" role="alert">The address: ' + data['results'][0]["formatted_address"] + '</p>' + '<p>The postcode: ' + value["long_name"] + '</div>')
            }
        })        
 
     initMap(data);
            
        }       
          
    }
    
    
});

    
    
});
    
});
