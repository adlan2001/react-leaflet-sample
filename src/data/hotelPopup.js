import { Popup } from 'react-leaflet';
import { FaStar, FaHotel, FaHouse, FaCar, FaWifi, FaWheelchair } from 'react-icons/fa6';
import { MdHotel, MdApartment, MdCottage } from 'react-icons/md';

export default function HotelPopup({ attributes }) {
  const hotelName = attributes.properties.name || '<no name>';
  const hotelType = attributes.properties.tourism;
  const hotelBrand = attributes.properties.brand;
  const hotelOperator = attributes.properties.operator;
  const hotelRooms = attributes.properties.rooms;
  const hotelStars = attributes.properties.stars || 'N/A';
  const hotelWheelchair = attributes.properties.wheelchair;
  const hotelInternet = attributes.properties.internet_access;
  const hotelPhone = attributes.properties.phone;
  const hotelWebsite = attributes.properties.website;

  let minImg = 1;
  let maxImg = 5;
  let random = Math.floor(Math.random() * (maxImg - minImg)) + minImg;

  const imgLinks = [
    '/img/hotel1.jpg',
    '/img/hotel2.jpg',
    '/img/hotel3.jpg',
    '/img/hotel4.jpg',
    '/img/hotel5.jpg'
  ]

  const typeIcons = () => {
    switch (hotelType) {
      case 'hotel':
        return <FaHotel className='text-4xl' title={hotelType} />
      case 'hostel':
        return (
          <MdHotel className='text-5xl' title={hotelType} />
        )
      case 'guest_house':
        return (
            <FaHouse className='text-4xl' title={hotelType} />
        )
      case 'apartment':
        return <MdApartment className='text-5xl' title={hotelType} />
      case 'motel':
        return (
          <FaCar className='text-3' title={hotelType} />
        )
      case 'chalet':
        return <MdCottage title={hotelType} className='text-4xl' />
      default:
        return <FaHotel className='text-4xl' />
    }
  }

  const internetIcons = () => {
    switch (hotelInternet) {
      case 'yes':
        return 'bg-green-600'
      case 'wlan':
        return 'bg-indigo-500'
      default:
        return 'bg-white'
    }
  }

  const wheelchairIcons = () => {
    switch (hotelWheelchair) {
      case 'yes':
        return 'bg-green-600'
      case 'limited':
        return 'bg-amber-500'
      case 'no':
        return 'bg-red-500'
      default:
        return 'bg-white'
    }
  }

  const imgAltTitle = hotelType+random;

  return (
    <Popup className='hotel-popup'>
      <div className='flex flex-row mb-2'>
        <span className='flex justify-center items-center mr-2'>{typeIcons()}</span>
        <div className='flex flex-col w-full'>
          <h2 className='text-center'>{hotelName}</h2>
          <div className='flex justify-center items-center mb-2'>
            {hotelStars === 'N/A' ? (
              <span className='text-xs'>(No ratings available)</span>
            ) : (
              <span className='mb-2 text-center text-xl flex justify-center'>
                {hotelStars && Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} color={i < hotelStars ? '#ffc107' : '#ccc'} />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-row'>
        <div>
          <img alt={`${imgAltTitle}`} title={`${imgAltTitle}`} className='h-[160px] w-[120px] max-w-none hotel-photo shadow-xl rounded' src={imgLinks[random]} />
        </div>
        <div className='flex flex-col w-full ml-4 justify-between'>
          <table className='border-collapse'>
            <tbody>
              {!(hotelBrand || hotelOperator || hotelRooms || hotelWheelchair || hotelInternet || hotelPhone) && (
                <tr>
                  <td className='text-xs text-wrap text-center'>(No data available for this {hotelType})</td>
                </tr>
              )}
              {hotelBrand && (
                <tr className='border-b-2 border-gray-500 text-sm'>
                  <td><strong className='mr-1'>Brand:</strong></td>
                  <td>{hotelBrand}</td>
                </tr>
              )}
              {hotelOperator && (
                <tr className='border-b-2 border-gray-500 text-sm'>
                  <td><strong className='mr-1'>Operator:</strong></td>
                  <td>{hotelOperator}</td>
                </tr>
              )}
              {hotelRooms && (
                <tr className='border-b-2 border-gray-500 text-sm'>
                  <td><strong className='mr-1'>Rooms:</strong></td>
                  <td>{hotelRooms}</td>
                </tr>
              )}
              {(hotelWheelchair || hotelInternet) && (
                <tr className='border-b-2 border-gray-500 text-sm'>
                  <td><strong className='mr-1'>Facilities:</strong></td>
                  <td><span className='flex'>
                    {hotelWheelchair && (
                      <span className={`flex size-5 ${wheelchairIcons()} rounded-md justify-center items-center border mr-1`} title={hotelWheelchair}>
                        <FaWheelchair />
                      </span>
                    )}
                    {hotelInternet && (
                      <span className={`flex size-5 ${internetIcons()} rounded-md justify-center items-center border`} title={hotelInternet}>
                        <FaWifi />
                      </span>
                    )}
                    </span>
                  </td>
                </tr>
              )}
              {hotelPhone && (
                <tr className='border-b-2 border-gray-500 text-sm'>
                  <td><strong className='mr-1'>Phone:</strong></td>
                  <td>{hotelPhone}</td>
                </tr>
              )}
            </tbody>
          </table>
          {hotelWebsite && (
            <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300' onClick={() => window.open(hotelWebsite, '_blank')}>
              Visit Site
            </button>
          )}
        </div>
      </div>
    </Popup>
  );
}