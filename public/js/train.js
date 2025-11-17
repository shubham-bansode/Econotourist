document.addEventListener('DOMContentLoaded', function () {
  // ***************************** Access Token for Map ******************************************
    // mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhdmlzaDIwMDQiLCJhIjoiY2x2aTY5c3c2MWJxMDJrbzVxbWl0dG90OCJ9.I3pZLAZHCJaPR8GCDzQEkQ';
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmhhdmlzaHlhMDgiLCJhIjoiY2x4ZDlzZ20zMDRlZTJuc2FlMWd5dzRkMCJ9.GL-kJpBA3WlRbh2cbHSmjg';
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [0, 0], // Default center (replace with user's location if available)
          zoom: 12 // Default zoom
        });
      
        const searchForm = document.getElementById('search-form');
        const trainDetails = document.getElementById('train-details');
      
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = [position.coords.longitude, position.coords.latitude];
            map.setCenter(userLocation);
          },
          (error) => console.error('Error fetching user location:', error)
        );
      });     
        
      
       