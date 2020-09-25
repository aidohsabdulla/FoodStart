 (function($) {
	  "use strict";
	  
	  var delicious_map={
	  	map: null,
	  	lat: 27.17508,
	  	lng: 78.042198,
	  	zoom:12,
	  	 
	  	init: function(){
		  	this.lat= DELICIOUS_GMAP.lat;
		  	this.lng= DELICIOUS_GMAP.lng;
		  	this.zoom=12;
		  	
	  		this.mapInit();
	  		this.mapDraw();
	  		//console.log(DELICIOUS_GMAP.lat);
	  		//console.log(DELICIOUS_GMAP.lng);
	  	},
	  	
	  	markerContent: function(){
	  		var link='#';
	  		var iconSrc= DELICIOUS_GMAP.map_icon;//'./assets/images/map-marker.png';
	  		return '<a href="'+link+'" class="mapmarker"><img src="'+iconSrc+'" alt="" /></a>';
	  	},
	  	
	  	mapDraw: function(){
	  		var mapLayout={
            lat : this.map.getCenter().lat(),
            lng : this.map.getCenter().lng(),
            content : this.markerContent(), 
            verticalAlign : 'top',
            horizontalAlign : 'left'
	       };
	       //console.log(mapLayout);
	  		this.map.drawOverlay(mapLayout);
	  		
	  	},
	  	mapInit: function(){
	  		
		  	var mapOptions={
	            div : '#map-view',
	            lat: this.lat,
				lng: this.lng,
	            disableDefaultUI : true,
	            zoom : this.zoom,
	            scrollwheel : false
		  		
		  	};	
	        this.map = new GMaps(mapOptions);	  		
	  	}
	  	
	  };
	  
	  
	  $(document).ready( function (){
	  
	  		delicious_map.init();
	  
	  });
	  
	  
	  
	 /* if ($('#map-box').length) {
	    var map = new GMaps({
		div: '#map-box',
		lat: gmap.lat,
		lng: gmap.lng,
		disableDefaultUI: true,
		zoom: 11,
		scrollwheel: false,
		styles: [{
			"featureType": "all",
			"elementType": "all",
			"stylers": [{
				"saturation": -100
			    }, {
				"gamma": 1
			    }]
		    }]
	    });
	    map.drawOverlay({
		lat: map.getCenter().lat(),
		lng: map.getCenter().lng(),
		content: '<a href="#" class="mapmarker"></a>',
		verticalAlign: 'top',
		horizontalAlign: 'center'

	    });

	    if ($(window).width() >= 1200) {
		map.setOptions({
		    center: new google.maps.LatLng(gmap.lat, gmap.lng),
		});
	    } else if ($(window).width() >= 992) {
		map.setOptions({
		    center: new google.maps.LatLng(gmap.lat, gmap.lng),
		});
	    } else if ($(window).width() >= 768) {
		map.setOptions({
		    center: new google.maps.LatLng(gmap.lat, gmap.lng),
		});
	    } else {
		map.setOptions({
		    center: new google.maps.LatLng(gmap.lat, gmap.lng),
		});
	    }
	}
	
if (jQuery('#map-view').length) {
        var map = new GMaps({
            div : '#map-view',
            //lat : 27.175072,
           // lng : 78.042198,
            lat: gmap.lat,
		lng: gmap.lng,
            disableDefaultUI : true,
            zoom : 12,
            scrollwheel : false
        });
        map.drawOverlay({
            lat : map.getCenter().lat(),
            lng : map.getCenter().lng(),
            content : '<a href="#" class="mapmarker"><img src="assets/images/map-marker.png" alt="" /></a>',
            verticalAlign : 'top',
            horizontalAlign : 'left'
        });
    }*/

})(jQuery);
