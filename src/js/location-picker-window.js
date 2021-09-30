/**
 * Utilities to work with maps popup
 */
export default class MapHelper {
  /**
   * Callback for when a map icon clicked
   *
   * @param  {String} id
   */
  openMapWindow(id) {
    // create a new popup window
    let newWin = window.open('about:blank', 'map', 'width=900,height=900')
    // define the content of the page
    let html = `
        <html>
        <head>
            <meta charset="utf-8" />
            <title>Pick a location</title>
            <meta
            name="viewport"
            content="initial-scale=1,maximum-scale=1,user-scalable=no"
            />
            <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css"
            rel="stylesheet"
            />
            <script src="https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.js"></script>
            <style>
            body {
                margin: 0;
                padding: 0;
            }
            #map {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
            }
            span {
                cursor: pointer;
            }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
            let lng;
            let lat;
            mapboxgl.accessToken =
                "pk.eyJ1IjoiYWxpa2hhZGRvdXIiLCJhIjoiY2t1NTZ3bnI4MTYzMjJ2bzZlcHZ5N2RpeCJ9.T71HltJvCfx-d3PcCbO_7Q";
            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-96, 37.8],
                zoom: 3,
            });
      
            map.on("click", (e) => {
                // e.lngLat is the longitude, latitude geographical position of the event.
                lat = e.lngLat.lat.toFixed(5);
                lng = e.lngLat.lng.toFixed(5);
                const popup = new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat([lng, lat])
                .setHTML('<span onclick="setLocation()">Pick this location</span>')
                .addTo(map);
            });
      
            function setLocation() {
                window.opener.document.getElementById("${id}").value = lat + "," + lng;
                window.close();
            }
            </script>
        </body>
        </html>
        `
    // write the content of the page
    newWin.document.write(html)
  }
}
