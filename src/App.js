import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';
import './App.css';
import './custom-leaflet.css';

import { MapContainer, LayersControl } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Basemaps from './data/basemaps';
import HotelMarker from './data/marker';
import SearchData from './data/searchData';

function App() {
  const clusterIcon = (cluster) => {
    const childCount = cluster.getChildCount();
    const iconColor = () => {
      switch (true) {
        case (childCount > 250):
          return 'child-250'
        case (childCount > 100 && childCount <= 250):
          return 'child-100'
        case (childCount > 50 && childCount <= 100):
          return 'child-50'
        case (childCount > 25 && childCount <= 50):
          return 'child-25'
        case (childCount > 10 && childCount <= 25):
          return 'child-10'
        default:
          return null
      }
    }

    return new divIcon({
      html: `<div class="cluster-icon ${iconColor()}"><strong>${childCount}</strong></div>`,
      className: 'custom-cluster-icon',
      iconSize: point(33, 33, true)
    });
  };
  // center={[3.136060,101.683788]} zoom={12}

  return (
    <div className="font-sans grid grid-rows-[1fr] min-h-screen">
      {/*<div className="font-sans grid grid-rows-[auto_1fr] min-h-screen">
      <header className="flex flex-col items-center justify-center text-white">
        <h1 className='text-5xl mt-5 mb-2'>Accommodations in KL</h1>
      </header>*/}
      <main>
        <MapContainer center={[3.136060,101.683788]} zoom={12} className='custom-leaflet' maxZoom={19}>
        {/*<MapContainer center={[51.505, -0.09]} zoom={13} className='custom-leaflet'>*/}
          <LayersControl position="topright" collapsed={false}>
            <Basemaps />
          </LayersControl>
          <SearchData position='topleft' />
          <MarkerClusterGroup chunkedLoading iconCreateFunction={clusterIcon} showCoverageOnHover={false} disableClusteringAtZoom={19}>
            <HotelMarker />
          </MarkerClusterGroup>
        </MapContainer>
      </main>
    </div>
  );
}

export default App;
