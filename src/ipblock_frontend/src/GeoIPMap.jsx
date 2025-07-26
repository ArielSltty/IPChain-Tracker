import { useEffect, useRef } from 'react';

function GeoIPMap({ logs = [] }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    let mapInstance;
    let markers = [];
    if (logs.length > 0 && mapContainerRef.current) {
      import('leaflet').then(L => {
        // Remove previous map instance if exists
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
        // Create new map
        mapInstance = L.map(mapContainerRef.current).setView(
          [logs[0]?.geo?.lat || 0, logs[0]?.geo?.lon || 0],
          2
        );
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapInstance);

        logs.forEach(log => {
          if (log?.geo?.lat && log?.geo?.lon) {
            const marker = L.marker([log.geo.lat, log.geo.lon])
              .addTo(mapInstance)
              .bindPopup(
                `<b>IP:</b> ${log.ip || 'Unknown'}<br>
                <b>Location:</b> ${log.geo.city || ''}, ${log.geo.country || ''}<br>
                <b>ISP:</b> ${log.geo.isp || 'Unknown'}`
              );
            markers.push(marker);
          }
        });
        mapRef.current = mapInstance;
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [logs]);

  return (
    <div
      ref={mapContainerRef}
      id="map"
      style={{
        height: '400px',
        width: '100%',
        margin: '2em 0',
        borderRadius: '8px',
        zIndex: 1,
      }}
    />
  );
}

export default GeoIPMap;
