// Mapbox Public Access Key
// ***************************** Access Token for Map ******************************************

//  mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhdmlzaDIwMDQiLCJhIjoiY2x2aTY5c3c2MWJxMDJrbzVxbWl0dG90OCJ9.I3pZLAZHCJaPR8GCDzQEkQ';
mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhdmlzaHlhMDgiLCJhIjoiY2x4ZDlzZ20zMDRlZTJuc2FlMWd5dzRkMCJ9.GL-kJpBA3WlRbh2cbHSmjg';


// Initializing Map
var map = new mapboxgl.Map({
    // Map Container ID
    container: 'map',
    // Mapbox Style URL
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12.56, // Default Zoom
    center: [121.037, 14.332] // Default centered coordinate
  });
  
  // Search Places
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: true,
  });
  
  // Direction Form
  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric', // Use metric unit (adjust if needed)
  });
  
  // Adding Search Places on Map
  map.addControl(geocoder, 'top-left');
  
  // Adding navigation control on Map
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

 // Function to get location name from coordinates
function getLocationNameSource(coordinates) {
  var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + coordinates[0] + ',' + coordinates[1] + '.json?access_token=' + mapboxgl.accessToken;

  fetch(url)
  .then(response => response.json())
  .then(data => {
      var locationNameSource = data.features[0].place_name;
      console.log('Source Location Name:', locationNameSource);
      document.querySelector(".forsource").value = locationNameSource;
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

// Event listener for the 'origin' event
directions.on('origin', function(event) {
  var source = event.feature.geometry.coordinates;
  console.log('Source:', source);
  
  // Get the location name for the source coordinates
  getLocationNameSource(source);
});

// Event handler for directions "destination" event
// Assuming you have already set up your Mapbox access token

// Function to get location name from coordinates
function getLocationNameDestination(coordinates) {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + coordinates[0] + ',' + coordinates[1] + '.json?access_token=' + mapboxgl.accessToken;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        var locationNamedestination = data.features[0].place_name;
        console.log('Destination Location Name:', locationNamedestination);
         document.querySelector(".fordestination").value =locationNamedestination;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Event listener for the 'destination' event
directions.on('destination', function(event) {
    var destination = event.feature.geometry.coordinates;
    console.log('Destination:', destination);
   
    // Get the location name for the destination coordinates
    getLocationNameDestination(destination);
});

  

// Function to calculate distance and trip cost
function calculateDistanceAndTripCost() {
  // Find the directions summary element (adjust selector if needed)
  var summaryElement = document.querySelector('.mapbox-directions-route-summary');
  if (!summaryElement) {
      console.error('Directions summary element not found.');
      return;
  }

  // Extract distance text from summary element
  var distanceText = summaryElement.textContent.match(/\d+(?:\.\d*)?\s*km/); // Regex for distance in km
  if (!distanceText) {
      console.error('Distance not found in directions summary.');
      return;
  }

  // Extract numeric distance value
  var distanceInKm = parseFloat(distanceText[0]);
  console.log("Hello");
  let fordistance = document.querySelector(".fordistance").value = distanceInKm;
  console.log(fordistance.value);
  console.log(distanceInKm);


  // Calculate trip cost based on extracted distance
  if(distanceInKm <= 60.000)
  { 
    document.querySelector(".alert2").style.display = "flex";
    document.querySelector(".rideform").style.display = "flex";

    var costola = 16.50; // Assuming a cost per kilometer
    var costrickshaw = 11.80;
    var tripCost_Ola = distanceInKm * costola;
    var tripCost_Rickshaw = distanceInKm * costrickshaw;
    tripCost_Ola = tripCost_Ola.toFixed(2); // Round to 2 decimal places
    tripCost_Rickshaw = tripCost_Rickshaw.toFixed(2); // Round to 2 decimal places
    document.getElementById('trip-cost1').textContent = 'Estimated Trip Cost for Ola : ' + tripCost_Ola;
    document.getElementById('trip-cost2').textContent = 'Estimated Trip Cost for Rickshaw : ' + tripCost_Rickshaw;
  }
  else {
    document.querySelector(".alert2").style.display = "none";
    document.querySelector(".rideform").style.display = "flex";
    var costola = 16.50; // Assuming a cost per kilometer
    var tripCost_Ola = distanceInKm * costola;
    tripCost_Ola = tripCost_Ola.toFixed(2); // Round to 2 decimal places
    document.getElementById('trip-cost1').textContent = 'Estimated Trip Cost for Ola : ' + tripCost_Ola;
  }
  
  // tripCost = tripCost.toFixed(2); // Round to 2 decimal places

  // document.getElementById('trip-cost').textContent = 'Estimated Trip Cost for Ola : ' + tripCost;
}

// Event handler for directions "route" event
directions.on('route', function(event) {
  // Calculate distance and trip cost when route is displayed
  calculateDistanceAndTripCost();
});


// Event listeners for direction buttons (optional)
$(function() {
  $('#get-direction').click(function() {
    // Adding Direction form and instructions on map (assuming buttons exist)
    map.addControl(directions, 'top-left');
    directions.container.setAttribute('id', 'direction-container');
    $(geocoder.container).hide();
    $(this).hide();
    $('#end-direction').removeClass('d-none');
    $('.marker').remove();
  });

  $('#end-direction').click(function() {
    direction_reset();
    $(this).addClass('d-none');
    $('#get-direction').show();
    $(geocoder.container).show();
  });
});

// Function to reset directions
function direction_reset() {
  map.removeControl(directions);
  document.getElementById('trip-cost').textContent = '';
}               






