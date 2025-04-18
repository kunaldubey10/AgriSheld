'use client';

import { useEffect, useRef, forwardRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

interface NDVIMapProps {
  onAreaSelect: (coordinates: [number, number][]) => void;
}

const NDVIMap = forwardRef<L.Map, NDVIMapProps>(({ onAreaSelect }, ref) => {
  const mapRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Initialize feature group for drawn items
      drawnItemsRef.current = L.featureGroup().addTo(mapRef.current);

      // Initialize draw control
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: drawnItemsRef.current
        }
      });

      mapRef.current.addControl(drawControl);

      // Handle draw events
      mapRef.current.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;
        drawnItemsRef.current?.addLayer(layer);

        // Get coordinates of the drawn polygon
        const coordinates = layer.getLatLngs()[0].map((latlng: L.LatLng) => [
          latlng.lat,
          latlng.lng
        ]) as [number, number][];

        onAreaSelect(coordinates);
      });

      // Handle edit events
      mapRef.current.on(L.Draw.Event.EDITED, (e: any) => {
        const layers = e.layers;
        layers.eachLayer((layer: L.Layer) => {
          if (layer instanceof L.Polygon) {
            const coordinates = layer.getLatLngs()[0].map((latlng: L.LatLng) => [
              latlng.lat,
              latlng.lng
            ]) as [number, number][];
            onAreaSelect(coordinates);
          }
        });
      });

      // Handle delete events
      mapRef.current.on(L.Draw.Event.DELETED, () => {
        onAreaSelect([]);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onAreaSelect]);

  return (
    <div 
      id="map" 
      className="w-full h-[500px] rounded-lg shadow-lg"
      style={{ zIndex: 0 }}
    />
  );
});

NDVIMap.displayName = 'NDVIMap';

export default NDVIMap; 