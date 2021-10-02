/**
 * Utilities to work with maps popup
 */
export default class MapHelper {
  /**
   * Callback for when a map icon clicked
   *
   * @param  {String} id
   */
  openMapWindow(id, lng, lat) {
    // create a new popup window
    let newWin = this.popupCenter({ url: '', title: 'map', w: 900, h: 500 })
    // window.open('about:blank', 'map', 'width=900,height=900')
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
                center: [${lat}, ${lng}],
                zoom: 7,
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

  popupCenter({ url, title, w, h }) {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

    const systemZoom = width / window.screen.availWidth
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(
      url,
      title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `,
    )

    if (window.focus) newWindow.focus()
    return newWindow
  }
}
