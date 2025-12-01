maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.TOPO,

    // starting position [longitude, latitude]
    center: campground.geometry.coordinates,

    // starting zoom
    zoom: 10,
    navigationControl: 'bottom-right',
    geolocateControl: 'bottom-right',
    terrainControl: 'bottom-right',
    scaleControl: true,
    fullscreenControl: 'bottom-right'
});

// Create div DOM element
// Add style="markerShowCamp" to created div element

const markerDiv = document.createElement("div");
markerDiv.classList.add('markerShowCamp');


new maptilersdk.Marker({element: markerDiv})
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new maptilersdk.Popup({offset: 25})
    .setHTML(
        `<div id="showCampPopUp">
        <h3>${campground.title}</h3>
        <p>${campground.location}</p>
        </div>`
    )
)
.addTo(map);