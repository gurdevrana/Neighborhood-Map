var map;
      // Create a new blank array for all the listing markers.
      var markers = [];
	var info=[];
 function initMap() {
        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 28.5726, lng: 77.2325},
          scrollwheel: false,
          zoom: 13
        });
		

     
		
		var pos={lat: -34.397, lng: 150.644};
//var vm= new myViewModel;
var locations=[
		  {title: 'Lajpat Nagar', location: {lat: 28.5677, lng: 77.2433}},
          {title: 'Defence Colony', location: {lat: 28.5726, lng: 77.2325}},
          {title: 'India Gate', location: {lat: 28.6129, lng: 77.2295}},
          {title: 'South Extension', location: {lat: 28.5698, lng: 77.2195}},
          {title: 'Hauz Khas', location: {lat: 28.5494, lng: 77.2001}},
          {title: 'Siri Fort', location: {lat: 28.5512, lng: 77.2278}}
		  ];		
var calcluate=function(loc,search){
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
		  //alert(title);
		  
		  var titles=[];
		  var descriptions=[];
		  var api="https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+title2;
		  //$.getJSON(api,function(data){
		//var obj= $.parseJSON(data);
		//alert("obj['extract']");
		//alert("done");
		//}).error(function (){
		//alert("error");
		//});
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
        //if(k=="extract"){
       
		$.each(v,function(key,val){
			if(key=="title"){
			titl=val;
			//titles.push(val)
			}
		  if(key=="extract")
		  { infi=val;
		  inform=val;
		  //alert(inform);
		//descriptions.push(val);	
		  }
		  //info.push({title:titl,description:inform});
        });
		
		
          });      //var resp = JSON.parse(response)
                //alert(resp.status);
				var re=response.query.pages;
				//var resp = JSON.parse(response);
				//console.log(re);
				var re=JSON.stringify(re);
				var resp = JSON.parse(re);
				//console.log(resp[0]);
				
		info.push({title:titl,description:inform});
		console.log(info);
            },
            error: function (xhr, status) {
                alert("error");
            }
        });
		
		
		this.descript;
		  this.infowindow = new google.maps.InfoWindow();
		  
		 
		  this.openInfowindow = function() {
			loclist.forEach(function(data){
			data.infowindow.close();	
			});
			
			//ko.utils.arrayForEach(myViewModel.loclist,function(loca){
   			//loca.infowindow.close();
			//});
			map.panTo(self2.marker.getPosition())
			self2.infowindow.open(map,self2.marker);
			self2.infowindow.setContent('<div class="infow">'+infi+'</div>');
		};
		this.addListener = google.maps.event.addListener(self2.marker,'click', (this.openInfowindow));
		if (loc.title.toLowerCase().indexOf(search) >= 0){
		this.titles=loc.title;
		return loc.title;
		}
		
		
};   
  var loclist=[];
var myViewModel = function(){
var self=this;
		
		this.query=ko.observable("");
		var search = this.query().toLowerCase();
		locations.forEach(function(data){
		loclist.push(new calcluate(data,search));}
		);
		console.log(loclist);
		
		this.search_loc=ko.computed(function(){
		
		var search = this.query().toLowerCase();
		return ko.utils.arrayFilter(locations, function(loca) {
            return loca.title.toLowerCase().indexOf(search) >= 0;
        });
		
		});
		
		
	 		
	
};
ko.applyBindings(myViewModel());
}
