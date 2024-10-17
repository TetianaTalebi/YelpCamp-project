maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BRIGHT,

    // starting position [longitude, latitude]
    center: campground.geometry.coordinates,

    // starting zoom
    zoom: 10
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