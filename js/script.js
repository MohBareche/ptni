const map = L.mapbox
  .map("mapDIV", null, {
    zoomControl: false,
    rotate: true,
    touchRotate: true,
    rotateControl: {
      closeOnZeroBearing: false,
    },
    bearing: 60,
  })
  .setView([45.60187729035522, -73.63153768308611], 14)
const zoomHome = L.Control.zoomHome().addTo(map)
// L.mapbox.accessToken =
//   "pk.eyJ1IjoibWJhcmVjaGUiLCJhIjoiY2pkbHpqZjQ3MGVibzJycWhka203dDNtYiJ9.GLpfZW2gcYULhuIa6vwgFw";

L.mapbox.accessToken = "pk.eyJ1IjoiYWJlbmZhdHRvdW0iLCJhIjoiY2ozY3l6MWV5MDAwZjMybnc0NmdhNDBpeSJ9.oYZEToeffGVafaQRotTLVg"

const Light = L.mapbox.styleLayer("mapbox://styles/mapbox/light-v10").addTo(map)
const Streets = L.mapbox.styleLayer("mapbox://styles/mapbox/streets-v11")
const Outdoors = L.mapbox.styleLayer("mapbox://styles/mapbox/outdoors-v11")
const Satellite = L.mapbox.styleLayer("mapbox://styles/mapbox/satellite-v9")

const googleStreets = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
})

const googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
})

const googleHybrid = L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
})

const googleTerrain = L.tileLayer("http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
})

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
})

const esriTile = L.esri.basemapLayer("Streets")

// create the geocoding control and add it to the map
// const searchControl = L.esri.Geocoding.geosearch({
//   providers: [
//     L.esri.Geocoding.arcgisOnlineProvider({
//       // API Key to be passed to the ArcGIS Online Geocoding Service
//       apikey:
//         "LPZI_RPSn5QOwul999v_YVinHGRcnhPhKoANjt-c4iQY51JqeKingfBg2gQWcbSQwp0oiO0xXR8z-qKvudiD8bTqcdUjxEj4mLHZKBavH0hs6sCw3DgeVGSyStkKqw89dfS51TihBWLex2mtVulwQ01thCWV_dAzhBZMR14rW8g4TBmiLdva61ychvVcfzUneCcNC5frVB4zCZUxRGbeNHF61KZ1vC73M5gl6eIF9lc.",
//     }),
//   ],
// });

// create an empty layer group to store the results and add it to the map
const results = L.layerGroup().addTo(map);
// L.easyPrint({
//   sizeModes: ["Current", "A4Landscape", "A4Portrait", ""],
//   filename: "Ma carte",
//   exportOnly: true,
//   hideControlContainer: true,
// }).addTo(map);

// listen for the results event and add every result to the map
const travIcon = L.icon({
  iconUrl: "../img/trav.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

/* ***************************************************************************************************************************************************** */
/* @OTHER - RENSEIGNEMENTS CHAUSSÉES 2023*/
			function getColorEP(EPAISSEUR_CHAUSSEE) {
				return EPAISSEUR_CHAUSSEE == 80
				    ? "#AAA"
				    : EPAISSEUR_CHAUSSEE == 100
				    ? "#00F"
				    : EPAISSEUR_CHAUSSEE == 140
				    ? "#0F0"
				    : EPAISSEUR_CHAUSSEE == 150
				    ? "#41A5E1"
				    : EPAISSEUR_CHAUSSEE == 200
				    ? "#FF0"
				    : EPAISSEUR_CHAUSSEE == 225
				    ? "#F00"
				    : EPAISSEUR_CHAUSSEE == 240
				    ? "#F37900"
				    : "#000"
            		}
                    const chausseeLayer = L.geoJSON(chaussee, {
			    
                        style: function (feature) {
                            return {
                                weight: 3,
                                color: getColorEP(feature.properties.EPAISSEUR_CHAUSSEE),
                                opacity: 1,
                            }
                        },

                        onEachFeature: function (feature, layer) {
                            // Créer une table HTML pour la popup
                            var popupContent = "<table>"

                            popupContent += `<tr style="background-color:silver; font-weight: bold;"><td>ID_TRC </td><td>${feature.properties.ID_TRC}</td></tr>`
                            popupContent += "<tr><td>Sur </td><td>" + feature.properties["GEOBASE_V.SUR"] + "</td></tr>"
                            popupContent += "<tr><td>De </td><td>" + feature.properties["GEOBASE_V.DE"] + "</td></tr>"
                            popupContent += "<tr><td>À </td><td>" + feature.properties["GEOBASE_V.A"] + "</td></tr>"
                            popupContent += "<tr><td>Matériaux </td><td>" + feature.properties["MATERIAUCHAUSSEE_REF"] + "</td></tr>"
                            popupContent += "<tr><td>Type fondation </td><td>" + feature.properties["TYPEFONDATION_REF"] + "</td></tr>"
                            popupContent += "<tr><td>Superficie (m²)</td><td>" + feature.properties["VOI_CHAUSSEE_JMAP_V.SUPERFICIE"] + "</td></tr>"
                            popupContent += "<tr><td>Longueur estimée (m)</td><td>" + feature.properties["VOI_CHAUSSEE_JMAP_V.LONGUEURESTIMEE"] + "</td></tr>"
                            popupContent += "<tr><td>Largeur estimée (m)</td><td>" + feature.properties["VOI_CHAUSSEE_JMAP_V.LARGEURESTIMEE"] + "</td></tr>"
                            popupContent += "<tr><td>Épaisseur chaussée (mm)</td><td>" + feature.properties["EPAISSEUR_CHAUSSEE"] + "</td></tr>"

                            popupContent += "</table>"
                            // Ajouter la popup à la couche de données
                            layer.bindPopup(popupContent)
                        },
                    })

/* ***************************************************************************************************************************************************** */


const arrondLayer = L.geoJson(limites_arr, {
  style: {
    weight: 2,
    opacity: 0.8,
    color: "black",
    dashArray: "5",
    fillOpacity: 0,
    fill: false,
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`
            <p style='margin:0; padding:0;'>Limites Arrondissement ${feature.properties.name}</p>
          `)
  },
}).addTo(map)
/* ***************************************************************************************************************************************************** */

//   RAAV 15/11/2022
//   RAAV VS LOCAL
function getColorRAAV(feature) {
  switch (feature) {
    case 1:
      return "#4933d5"
    case 0:
      return "#4c9b20"
  }
}
function styleRAAV(feature) {
  if (feature.properties.TRC_TOP_RAAV == 1) {
    return {
      color: getColorRAAV(feature.properties.TRC_TOP_RAAV),
      fillColor: getColorRAAV(feature.properties.TRC_TOP_RAAV),
      weight: 5,
      opacity: 1,
    }
  } else {
    return {
      color: getColorRAAV(feature.properties.TRC_TOP_RAAV),
      fillColor: getColorRAAV(feature.properties.TRC_TOP_RAAV),
      opacity: 1,
    }
  }
}
const raavLayer = L.geoJson(RAAV, {
  style: styleRAAV,
  onEachFeature: function (feature, layer) {
    if (feature.properties.TRC_TOP_RAAV == 1) {
      layer.bindPopup(`
            <p style='margin:0; padding:0;'><strong>Type : </strong>RAAV</p>
            `)
    } else {
      layer.bindPopup(`
        <p style='margin:0; padding:0;'><strong>Type : </strong>Local</p>
      `)
    }
  },
})


/* ***************************************************************************************************************************************************** */

// listen for the results event and add every result to the map
const pegmanIcon = L.icon({
  iconUrl: "../img/google-street-view.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

// Add a marker to the center of the map
const markerGSV = L.marker(map.getCenter(), { icon: pegmanIcon })
// Make sure the marker stays in the centre when the map is moved
map.on("move", function () {
  let center = markerGSV.setLatLng(map.getCenter())
  // console.log(center)
})

//  Control Groups et overlays

const baseTree = {
  label: "Fonds de carte",
  children: [
    { label: "Mapbox Light", layer: Light },
    { label: "Mapbox Streets", layer: Streets },
    { label: "Google Streets", layer: googleStreets },
    { label: "Google Satellite", layer: googleSat },
    { label: "ISRI Streets", layer: esriTile },
    { label: "Open Street Map", layer: osm },
  ],
}

const overlaysTree = {
  label: "Couches",
  children: [
          { label: "Réseau RAAV", layer: raavLayer },
	  { label: "Épaisseur Chaussée", layer: chausseeLayer},
          { label: "Google Street View", layer: markerGSV }
	]
}

const lay = L.control.layers.tree(baseTree, overlaysTree, {
  namedToggle: true,
  selectorBack: false,
  closedSymbol: "&#8862; &#x1f5c0;",
  openedSymbol: "&#8863; &#x1f5c1;",
  collapsed: true,
})

lay.addTo(map).collapseTree(true).expandSelected(true)

L.control
  .locate({
    flyTo: true,
    strings: {
      title: "Montre-moi où je suis !",
    },
  })
  .addTo(map)

map.addControl(
  new L.Control.Fullscreen({
    title: {
      false: "Afficher plein écran",
      true: "Quitter le plein écran",
    },
  })
)

// Google Street View
L.streetView({ position: "topright" }).addTo(map)




let arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider({ countries: "CA" })
const searchControl = L.esri.Geocoding.geosearch({
  // collapseAfterResult: false,
  placeholder: "Rechercher des lieux ou des adresses...",
  title: "Recherche d'emplacement",
  providers: [arcgisOnline],
}).addTo(map)

searchControl.on("results", function (data) {
  results.clearLayers()
  for (let i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng, { icon: travIcon }))
  }
})

// Échelle à droite en bas
L.control.scale({ position: "bottomleft" }).addTo(map)


/***********************************************************************************************************************/
chausseeLayer.on('add', function(){
   legend.addTo(map)
});
		 
chausseeLayer.on('remove', function(){
   map.removeControl(legend);
});

function getColor(ep) {
        return ep === '80mm pavage (3")'  ? "#AAA" :
               ep === '100mm pavage (4")'  ? "#00F" :
               ep === '140mm pavage (5 ½")' ? "#0F0" :
	       ep === '150mm pavage (6")' ? "#41A5E1" :
	       ep === '200mm pavage (8")' ? "#FF0" :
	       ep === '225mm Béton + 80mm pavage' ? "#F00" :
	       ep === 'Pavage 240mm en 3 couches' ? "#F37900" :
               ep === 'Roadside Hazards' ? "#984ea3" :
                            "#000";
    }

var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'legend');
    labels = ['<h4>Épaisseur de pavage</h4>'],
    categories = ['Pavage 240mm en 3 couches','225mm Béton + 80mm pavage','200mm pavage (8")','150mm pavage (6")','140mm pavage (5 ½")','100mm pavage (4")', '80mm pavage (3")'];

    for (var i = 0; i < categories.length; i++) {
            div.innerHTML += 
            labels.push(
		 `<svg width="60" height="10">
		 <rect width="60" height="10" style="fill:${getColor(categories[i])};stroke-width:1;stroke:rgb(0,0,0)" />
		  </svg>   
            ${categories[i]}`);
        }
        div.innerHTML = labels.join('<br>');
    return div;
    };

/***********************************************************************************************************************/
