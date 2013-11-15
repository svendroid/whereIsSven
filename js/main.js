(function(){
var map = L.mapbox.map('map', 'svendroid.g9229j1j', {
													    center: [45.73685954736049, 3.2080078125],
													    zoom: 4,
													    closePopupOnClick: false
													}),
	timer;
	    
map.markerLayer.on('ready', function(e) {
	document.getElementById('play-journey').onclick = playJourney;
    map.markerLayer.eachLayer(function(marker) {
        //find 'sven ist hier' marker and center map to it
        if (marker.feature.properties.title === 'Sven ist hier!') {
            marker.openPopup();
            map.panTo(marker.getLatLng());
        }
	});
});

function playJourney(){
	console.log('Folge den Spuren Svens!');

	map.on('click', onClick);

	var layers = map.markerLayer.getLayers(),
		i = 0;

	moveToNextMarker();
	timer = setInterval(moveToNextMarker, 2000);

	function moveToNextMarker(){
		if(i >= layers.length ){
			clearInterval(timer);
		} else {
			var marker = layers[i];
			console.log(marker.feature.properties.title);
			map.panTo(layers[i].getLatLng());
			marker.openPopup();
			i++;
		}
	}
}

function onClick(){
	console.log("onClick");
	clearInterval(timer);
	map.off('click', onClick);
}
})();