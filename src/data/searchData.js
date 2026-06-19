import { useEffect, useState } from "react";
import { useLeafletContext } from '@react-leaflet/core';
import { Control, DomUtil, CircleMarker } from 'leaflet';
import L from 'leaflet';
import { fetchHotelData } from "../services/data";

const SearchData = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const context = useLeafletContext();

  // Fetch hotel data
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const fetchedData = await fetchHotelData(controller.signal);
        setData(fetchedData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);
  
  // Create search control with hotel data
  useEffect(() => {
    if (!data) return;

    // Build search data
    const searchData = data.features
      .filter((feature) => feature.geometry?.coordinates)
      .map((feature) => ({
        loc: feature.geometry.coordinates.slice().reverse(),
        title: feature.properties.name || "Hotel"
      }));

    const SearchControlClass = Control.extend({
      onAdd: (map) => {
        const div = DomUtil.create('div', 'leaflet-search');
        const input = DomUtil.create('input', 'leaflet-search-input');
        input.placeholder = 'Search';
        input.type = 'text';

        let currentMarker = null;

        L.DomEvent.disableClickPropagation(div);

        input.addEventListener('input',(e) => {
          const query = e.target.value.toLowerCase();
          const results = searchData.filter((item) => 
            item.title.toLowerCase().includes(query)
          ).slice(0,10);

          // Clear previous results
          const existingList = div.querySelector('.leaflet-search-results');
          if (existingList) existingList.remove();

          //Only show results if there's a query and results exist
          if (query && results.length > 0) {
            const resultsList = DomUtil.create('ul','leaflet-search-results')

            results.forEach(result => {
              const li = DomUtil.create('li','leaflet-search-item',resultsList);
              li.textContent = result.title;
              li.title = result.title;

              li.addEventListener('click', () => {
                const map = context.map;

                if (currentMarker) {
                  map.removeLayer(currentMarker);
                }

                // Create multiple expanding circles for radar effect
                /*for (let i = 0; i < 3; i++) {
                  L.circleMarker(result.loc, {
                    radius: 7 + i * 8,
                    fillColor: "red",
                    fillOpacity: 0.4 - i * 0.13,
                    color: "red",
                    weight: 1,
                    className: `radar-pulse radar-pulse-${i}`
                  }).addTo(map);
                }*/

                currentMarker = L.circleMarker(result.loc, {
                  radius: 10,
                  fillColor: "red",
                  fillOpacity: 0.4,
                  color: "darkred",
                  weight: 2,
                  className: 'blink-result'
                }).addTo(map);

                map.flyTo(result.loc,18);
                input.value = result.title;
                resultsList.remove();
              });
            });
            div.appendChild(resultsList);
          }
        });
        div.className = `leaflet-search`;
        div.appendChild(input);
        return div;
      },
      onRemove: (map) => {}
    });

    const control = new SearchControlClass();
    const container = context.layerContainer || context.map;
    container.addControl(control);

    return () => {
      container.removeControl(control);
    };
  }, [data, context]);

  return null;
}

export default SearchData;