// Fetch hotel data from GeoJSON file
export const fetchHotelData = async (signal) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/hotel_kl.geojson`, { signal });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
};
