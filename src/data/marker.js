import { useEffect, useState } from "react";
import { renderToString } from 'react-dom/server';
import { FaHotel, FaHouse, FaCar } from 'react-icons/fa6';
import { MdHotel, MdApartment, MdCottage } from 'react-icons/md';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import HotelPopup from './hotelPopup';
import { fetchHotelData } from '../services/data';

import 'beautifymarker/leaflet-beautify-marker-icon';
import 'beautifymarker/leaflet-beautify-marker-icon.css'

const HotelMarker = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const setIcon = (properties) => {
    const hotelName = properties.name;
    const hotelType = properties.tourism;

    const markerTitle = hotelName + ' (' + hotelType + ')';
    const iconColor = 'rgba(255,255,255,0.9)';

    const setSymbology = () => {
      switch (hotelType){
        case 'hotel':
          return {color:'indigo', html:<FaHotel color={iconColor} className='size-4' title={markerTitle}/>}
        case 'hostel':
          return {color:'green', html:<MdHotel color={iconColor} className='size-5' title={markerTitle} />}
        case 'guest_house':
          return {color:'teal', html:<FaHouse color={iconColor} className='size-5' title={markerTitle} />}
        case 'apartment':
          return {color:'maroon', html:<MdApartment color={iconColor} className='size-5' title={markerTitle} />}
        case 'chalet':
          return {color:'purple', html:<MdCottage color={iconColor} className='size-5' title={markerTitle} />}
        case 'motel':
          return {color:'red', html:<FaCar color={iconColor} className='size-5' title={markerTitle} />}
        default:
          return {color:'blue', html:<FaHotel color={iconColor} className='size-4' title={markerTitle} />}
      }
    }

    const myIcon = L.BeautifyIcon.icon({
      iconShape: 'marker',
      iconSize: [40,40],
      iconAnchor: [20,45],
      isAlphaNumericIcon: true,
      text: renderToString(setSymbology().html),
      innerIconAnchor: [-6,-6],
      borderWidth: 0,
      customClasses: 'marker-shadow',
      backgroundColor: setSymbology().color
    })

    return myIcon
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await fetchHotelData(controller.signal);
        setData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return (<>
      {data && data.features.map((feature, idx) => (
        <Marker key={idx} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]} icon={setIcon(feature.properties)}>
          <HotelPopup attributes={feature} />
        </Marker>
      ))}
    </>
  );
}

export default HotelMarker;