import { LayersControl, TileLayer } from 'react-leaflet';

const basemaps = {
  OpenStreetMap: {
    name: "OpenStreetMap HOT",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    checked: true
  },
  EsriWorldImagery: {
    name: "Esri World Imagery",
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  }
};

export default function Basemaps() {
  return (Object.values(basemaps).map((basemap, idx) => (
    <LayersControl.BaseLayer key={idx} checked={basemap.checked} name={basemap.name}>
      <TileLayer attribution={basemap.attribution} url={basemap.url} maxNativeZoom={18} maxZoom={19}/>
    </LayersControl.BaseLayer>
  )));
};