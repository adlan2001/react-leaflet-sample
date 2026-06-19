import { LayersControl, TileLayer } from 'react-leaflet';

const basemaps = {
  OpenStreetMap: {
    name: "CartoDB Voyager",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    checked: true
  },
  StadiaMaps: {
    name: "Stadia Watercolor",
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
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