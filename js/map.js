var map;
// Create a new blank array for all the listing markers.
var markers = [];
var info=[];
function initMap(){
        // Create a map object and specify the DOM element for display.
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 28.5726, 
			lng: 77.2325
			},
		scrollwheel: false,
		zoom: 13
    });
		
	var pos={lat: -34.397, lng: 150.644};
//var vm= new myViewModel;
		
	function Location(loc){
		var self2=this;
		var infi;
		this.marker = new google.maps.Marker({
			map:map,
			position: loc.location,
			title: loc.title,
			animation: google.maps.Animation.DROP
           
			});
		var title=loc.title;
		var title2 = title.replace(/[ ,]+/g, "_");  
		var titles=[];
		var descriptions=[];
		var api="https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+title2;
		$.ajax({
            url: api,
            type: "GET",
            crossDomain: true,
			dataType: "jsonp",
			xhrFields: {withCredentials: true},
            success: function (response) {
				var titl;
				var inform;
				$.each(response["query"]["pages"],function(k,v){
					$.each(v,function(key,val){
						if(key=="title"){
							titl=val;
							}
						if(key=="extract"){
							infi=val;
							inform=val;	
							}
					});
				});  
            },
			
            error: function (xhr, status) {
                alert("Unable to load data from wikipedia ");
            }
        });
		this.infowindow = new google.maps.InfoWindow(); 
		this.openInfowindow = function() {
			myViewModel.locations.forEach(function(data){
				console.log(data.title);
				data.infowindow.close();
				data.marker.setAnimation(null);			
			});
			
			map.panTo(self2.marker.getPosition())
			self2.infowindow.open(map,self2.marker);
			self2.infowindow.setContent('<div class="infow">'+infi+'</div>');
			self2.marker.setAnimation(google.maps.Animation.BOUNCE);
		};
		
		this.infowindow.addListener('closeclick', function() {
            self2.marker.setAnimation(null);
          });
		
		this.addListener = google.maps.event.addListener(self2.marker,'click', (this.openInfowindow));
		return {title:loc.title,marker:this.marker,infowindow:this.infowindow,openInfowindow:this.openInfowindow}
		}   
	var myViewModel = {

		locations:[
			new Location({title: 'Lajpat Nagar', location: {lat: 28.5677, lng: 77.2433}}),
			new Location({title: 'Defence Colony', location: {lat: 28.5726, lng: 77.2325}}),
			new Location({title: 'India Gate', location: {lat: 28.6129, lng: 77.2295}}),
			new Location({title: 'South Extension', location: {lat: 28.5698, lng: 77.2195}}),
			new Location({title: 'Hauz Khas', location: {lat: 28.5494, lng: 77.2001}}),
			new Location({title: 'Siri Fort', location: {lat: 28.5512, lng: 77.2278}})
			],
		query: ko.observable(''),
	};
	
	
	myViewModel.search = ko.computed(function() {
		var self = this;
		var search = this.query().toLowerCase();
		return ko.utils.arrayFilter(self.locations, function(location) {
			 if (location.title.toLowerCase().indexOf(search) >= 0){
				return location.title;
			}
		});
	}, myViewModel);
	
	ko.applyBindings(myViewModel);
}
	
function maperror(){
alert("Unable to Load google map please try again");
}