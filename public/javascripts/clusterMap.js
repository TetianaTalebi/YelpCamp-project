
maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'cluster-map',
    style: maptilersdk.MapStyle.BASIC,
    center: [-92.3468, 62.1304],
    // center: [-103.59179687498357, 40.66995747013945],
    zoom: 2.65,
    navigationControl: 'bottom-right',
    geolocateControl: 'bottom-right',
    terrainControl: 'bottom-right',
    scaleControl: true,
    fullscreenControl: 'bottom-right'
});

map.on('load', async function () {

    const tent_img = await map.loadImage('../images/MapTiler_tent_icon_PNG.png');

    map.addImage('pinTent', tent_img.data);

    map.addSource('campgrounds', {
        type: 'geojson',
        data: campgrounds,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.maptiler.com/gl-style-specification/expressions/#step)
            // with three steps to implement three types of circles:
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#38B000',// '#00BCD4',
                10,
                '#70E000',// '#2196F3',
                30,
                '#9EF01A',// '#3F51B5',
                100,
                '#CCFF33'// '#7400b8'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                25, //radius
                10, //qu-ty (radius 25 for qu-ties less than 10)
                30, //radius
                30, //qu-ty (radius 30 for qu-ties less than 30)
                35, //radius
                100, //qu-ty (radius 35 for qu-ties less than 100)
                40 //radius 40 for qu-ties larger than or equal to 100
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'pinTent',

            // Show an icon on the map as half of its original size (the original size is 'icon-size': 1)
            'icon-size': 0.5

            // 'icon-size': ['*', ['get', 'scalerank'], 0.01]
        },
        paint: {}
    });

    // map.addLayer({
    //     id: 'unclustered-point',
    //     type: 'circle',
    //     source: 'campgrounds',
    //     filter: ['!', ['has', 'point_count']],
    //     paint: {
    //         'circle-color':  '#008000', //'#f72585',  //'#11b4da',
    //         'circle-radius': 10,
    //         'circle-stroke-width': 0, //2,
    //         'circle-stroke-color': '#008000'//'#fb5607'
    //     }
    // });

    // inspect a cluster on click
    map.on('click', 'clusters', async (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        const zoom = await map.getSource('campgrounds').getClusterExpansionZoom(clusterId);
        map.easeTo({
            center: features[0].geometry.coordinates,
            zoom
        });
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', function (e) {
        const { popUpMarkup } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new maptilersdk.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
    });
});