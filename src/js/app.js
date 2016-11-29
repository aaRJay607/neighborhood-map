var locations = [
  {location:{lat:18.9220,lng:72.8347},title:'Gateway of India',content: 'The Gateway of India is a monument built during the 20th century in Mumbai(India) that overlooks the Arabian Sea.'},
  {location:{lat:18.9398,lng:72.8355},title:'Chhatrapati Shivaji Terminus railway station',content: 'Chhatrapati Shivaji Terminus, is a historic railway station and a UNESCO World Heritage Site in Mumbai.'},
  {location:{lat:18.9440,lng:72.8230},title:'Marine Drive',content: 'Marine Drive is a 3.5-kilometre-long boulevard in South Mumbai in the city of Mumbai. It is a "C"-shaped six-lane concrete road along the coast, which is a natural bay.'},
  {location:{lat:18.926667,lng:72.832222},title:'Chhatrapati Shivaji Maharaj Museum',content: 'Formerly known as Prince of Wales Museum, houses approximately 50,000 exhibits of ancient Indian history as well as objects from foreign lands, categorized primarily into three sections: Art, Archaeology and Natural History.'},
  {location:{lat:19.03648,lng:72.81725},title:'Bandra Worli Sea Link',content: 'It is a cable-stayed bridge with pre-stressed concrete-steel via ducts on either side that links Bandra in the Western Suburbs of Mumbai with Worli in South Mumbai.'}
];

var viewModel = function() {
  var self = this;
  self.currentArray = ko.observableArray([]);
  locations.forEach(function(loc) {
    self.currentArray.push(loc);
  });
  console.log(self.currentArray());

  button.addEventListener('click', function() {
    // div1.classList.toggle('open');
    self.currentArray().length = 0;
    console.log(self.currentArray());
  });

  self.render = ko.computed(function() {
    this.currentArray().forEach(function(arr){
      var marker = new google.maps.Marker({
        position: arr.location,
        map: map,
        title: arr.title
      });

      var infoWindow = new google.maps.InfoWindow({
        content: arr.content
      })

      marker.addListener('click',function() {
        infoWindow.open(map,marker);
      })
    });
  },self);

}

//map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.067512, lng: 72.879770},
    zoom: 11,
    disableDefaultUI: true
  });
  ko.applyBindings(new viewModel());    //Reference=https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282#placing-callback
}


// Sliding Side Bar
var button = document.querySelector('.filterBtn-svg');
var div1 = document.querySelector('.div1');

button.addEventListener('click', function() {
  div1.classList.toggle('open');
});
