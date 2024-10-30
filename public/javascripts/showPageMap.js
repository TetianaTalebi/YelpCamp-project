maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BASIC,

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

new maptilersdk.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new maptilersdk.Popup({offset: 25})
    .setHTML(
        `<h3>${campground.title}</h3>
        <p>${campground.location}</p>`
    )
)
.addTo(map);