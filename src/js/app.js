var locations = [
  {location:{lat:18.9220,lng:72.8347},title:'Gateway of India',content: 'The Gateway of India is a monument built during the 20th century in Mumbai(India) that overlooks the Arabian Sea.'},
  {location:{lat:18.9398,lng:72.8355},title:'Chhatrapati Shivaji Terminus railway station',content: 'Chhatrapati Shivaji Terminus, is a historic railway station and a UNESCO World Heritage Site in Mumbai.'},
  {location:{lat:18.9440,lng:72.8230},title:'Marine Drive',content: 'Marine Drive is a 3.5-kilometre-long boulevard in South Mumbai in the city of Mumbai. It is a "C"-shaped six-lane concrete road along the coast, which is a natural bay.'},
  {location:{lat:18.926667,lng:72.832222},title:'Chhatrapati Shivaji Maharaj Museum',content: 'Formerly known as Prince of Wales Museum, houses approximately 50,000 exhibits of ancient Indian history as well as objects from foreign lands, categorized primarily into three sections: Art, Archaeology and Natural History.'},
  {location:{lat:19.03648,lng:72.81725},title:'Bandra Worli Sea Link',content: 'It is a cable-stayed bridge with pre-stressed concrete-steel via ducts on either side that links Bandra in the Western Suburbs of Mumbai with Worli in South Mumbai.'},
  {location:{lat:18.9827,lng:72.8090},title:'Haji Ali Dargah',content: 'The Haji Ali Dargah is a mosque and dargah located on an islet off the coast of Worli in the southern part of Mumbai. Near the heart of the city proper, the dargah is one of the most recognisable landmarks of Mumbai.'},
  {location:{lat:19.0173,lng:72.8305},title:'Siddhivinayak Temple',content: 'The Shree Siddhivinayak Ganapati Mandir is a Hindu temple dedicated to Lord Shri Ganesh.Siddhivinayak is well known as "Navasacha Ganapati" ("Ganapati bestows whenever humbly genuinely prayed a wish" in Marathi) among devotees.'},
  {location:{lat:19.0988,lng:72.8321},title:'Juhu Beach',content: 'Juhu Beach is located on the shores of the Arabian Sea,in the western part of Mumbai. It stretches for six kilometres up to Versova. It is a popular tourist attraction throughout the year and is also a sought after destination for shooting films.'},
  {location:{lat:19.2256,lng:72.8696},title:'Sanjay Gandhi National Park',content: 'Sanjay Gandhi National Park, previously called Borivali National Park, is a large protected area in the northern part of Mumbai'},
  {location:{lat:19.0427179,lng:72.8191316},title:'Bandstand Promenade',content: 'The Bandstand Promenade is a kilometer long walkway along the sea on the west side of Bandra, a suburb of Mumbai, India. It is simultaneously a popular hangout spot, a jogging track and a park.'}
];

var markers = [];
var viewModel = function() {
  var self = this;

  var bounds = new google.maps.LatLngBounds();

  locations.forEach(function(arr){
    var marker = new google.maps.Marker({
      position: arr.location,
      map: map,
      title: arr.title
    });

    marker.addListener('click',function() {
      openInfoWindow(marker);//,infoWindow);
    })

    marker.display = ko.observable(1);

    bounds.extend(marker.position);

    marker.infoWindow = new google.maps.InfoWindow({
      content: arr.content+'<div><strong>Loading...</strong></div>'
    });

    var wikiUrl = wikiUrl1+arr.title+wikiUrl2;
    var wikiError = setTimeout(function(){
      marker.infoWindow.close();    // To close the loading markers
      marker.infoWindow = new google.maps.InfoWindow({
        content: arr.content+'<div><strong>Wikipedia request failed. Please try later!</strong></div>'
      });
    },8000);
    $.ajax( {
      url: wikiUrl,
      dataType: 'jsonp',
      success: function(data) {
        var contentUrl = data[3];
        marker.infoWindow.close();    // To close the loading markers
        marker.infoWindow = new google.maps.InfoWindow({
          content: arr.content + '<div><a href="'+contentUrl[0]+'">'+contentUrl[0]+'</a></div>'
        });
        clearTimeout(wikiError);
      }
    });
    map.fitBounds(bounds);
    markers.push(marker);
  });

  self.active = function() {
    self.noneVisible();
    this.setVisible(true);
    this.display(1);
    openInfoWindow(this);
  }

  var openInfoWindow = function(marker) {
    markers.forEach(function(marker) {
      marker.infoWindow.close();
    });
    marker.infoWindow.open(map,marker);
  }

  self.allVisible = function() {
    markers.forEach(function(marker) {
      marker.display(1);
      marker.infoWindow.close();
      marker.setVisible(true);
      map.fitBounds(bounds);
    })
  }

  self.noneVisible = function() {
    markers.forEach(function(marker) {
      marker.setVisible(false);
    })
  }

  self.filterVal = "";
  // indexOf ref=http://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-an-object-in-javascript
  self.filter = function() {
    self.flag = 0;
    markers.forEach(function(marker) {
      marker.infoWindow.close();
      if(marker.title.toLowerCase().indexOf(self.filterVal.toLowerCase()) > -1) {
        marker.setVisible(true);
        marker.display(1);
        self.flag = 1;
      }else {
        marker.setVisible(false);
        marker.display(0);
        // alert("No matches found!");
      }
    })
    if(self.flag===0) {
      alert("No matches. Try again or hit reset button");
    }
  }
}

//map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.067512, lng: 72.879770},
    zoom: 11,
    // disableDefaultUI: true
    mapTypeControl: false   // This option doesn't remove the zoom controls. ref=http://stackoverflow.com/questions/4321606/how-to-remove-a-maptype-from-google-map-using-google-maps-javascript-v3-api
  });
  ko.applyBindings(new viewModel());    //Reference=https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282#placing-callback
}


// Sliding Side Bar ref=Responsive web development course
var button = document.querySelector('.filterBtn-svg');
var div1 = document.querySelector('.div1');

button.addEventListener('click', function() {
  div1.classList.toggle('open');
});

// Resetting the textbox on pressing the reset button.
var textbox = document.getElementById('text');
var reset = document.querySelector('#reset');

reset.addEventListener('click', function() {
  textbox.value = "";
  // textbox.setAttribute('placeholder','Type and hit search');
})

var wikiUrl1 = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
var wikiUrl2 = "&format=json&callback=wikiCallback";
