import { useEffect, useRef, useState } from "react";

interface MarkerData {
  position: { lat: number; lng: number };
  name: string;
  price: number;
  change: number;
  crop: string;
}

interface OpenStreetMapProps {
  markers: MarkerData[];
  onMarkerClick?: (marker: MarkerData) => void;
}

export function OpenStreetMap({ markers, onMarkerClick }: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    cssLink.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    cssLink.crossOrigin = "";
    document.head.appendChild(cssLink);

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(cssLink);
      document.head.removeChild(script);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.L) return;

    const initMap = () => {
      const L = window.L;

      if (!mapInstanceRef.current) {
        // Initialize map centered on India
        const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add new markers
      markers.forEach((markerData) => {
        const color = markerData.change > 0 ? "#10b981" : markerData.change < 0 ? "#ef4444" : "#fbbf24";

        // Create custom icon
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background-color: ${color};
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              position: relative;
            "></div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([markerData.position.lat, markerData.position.lng], {
          icon: customIcon,
        }).addTo(mapInstanceRef.current);

        // Add popup
        const popupContent = `
          <div style="padding: 8px; min-width: 150px;">
            <h3 style="margin: 0 0 4px; font-weight: 600; color: #111; font-size: 16px;">${markerData.name}</h3>
            <p style="margin: 0; font-size: 14px; color: #666;">${markerData.crop}</p>
            <p style="margin: 4px 0 0; font-weight: 600; color: #111; font-size: 16px;">₹${markerData.price}/qtl</p>
            <p style="margin: 2px 0 0; color: ${color}; font-size: 12px; font-weight: 500;">
              ${markerData.change > 0 ? "+" : ""}${markerData.change}% (24h)
            </p>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Add click handler
        marker.on("click", () => {
          if (onMarkerClick) {
            onMarkerClick(markerData);
          }
        });

        markersRef.current.push(marker);
      });
    };

    initMap();
  }, [isLoaded, markers, onMarkerClick]);

  if (!isLoaded) {
    return (
      <div className="relative w-full h-[500px] rounded-lg bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400 mb-2">Loading map...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[1000]">
        <div className="text-gray-900 dark:text-white text-sm mb-2">Price Change</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-gray-700 dark:text-gray-300 text-xs">Increase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-700 dark:text-gray-300 text-xs">Stable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700 dark:text-gray-300 text-xs">Decrease</span>
          </div>
        </div>
      </div>

      <style>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

// Add TypeScript declaration for Leaflet on window
declare global {
  interface Window {
    L: any;
  }
}
