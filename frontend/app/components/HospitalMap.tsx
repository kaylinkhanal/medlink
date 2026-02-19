'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { toast } from 'react-hot-toast';

interface HospitalResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .hospital-map-root {
    font-family: 'DM Sans', sans-serif;
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    background: #0f1117;
    overflow: hidden;
    display: flex;
  }

  /* ── Sidebar ── */
  .hm-sidebar {
    position: relative;
    z-index: 20;
    width: 360px;
    min-width: 360px;
    background: #13151c;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
  }

  .hm-sidebar-header {
    padding: 28px 24px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .hm-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .hm-logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  }

  .hm-logo-text {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .hm-logo-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 1px;
  }

  /* Search */
  .hm-search-wrap {
    position: relative;
  }

  .hm-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.35);
    font-size: 15px;
    pointer-events: none;
  }

  .hm-search-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    padding: 12px 14px 12px 42px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .hm-search-input::placeholder {
    color: rgba(255,255,255,0.28);
  }

  .hm-search-input:focus {
    border-color: rgba(99, 102, 241, 0.6);
    background: rgba(255,255,255,0.07);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  .hm-search-btn {
    margin-top: 10px;
    width: 100%;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    border: none;
    border-radius: 12px;
    padding: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.2px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .hm-search-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
  }

  .hm-search-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Results list */
  .hm-results-header {
    padding: 16px 24px 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.3);
  }

  .hm-results-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 12px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .hm-results-list::-webkit-scrollbar { width: 4px; }
  .hm-results-list::-webkit-scrollbar-track { background: transparent; }
  .hm-results-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

  .hm-result-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 12px 14px;
    cursor: pointer;
    transition: all 0.18s ease;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .hm-result-card:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateX(2px);
  }

  .hm-result-card.active {
    background: rgba(99, 102, 241, 0.12);
    border-color: rgba(99, 102, 241, 0.5);
  }

  .hm-result-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    color: rgba(99, 102, 241, 0.8);
    background: rgba(99, 102, 241, 0.15);
    border-radius: 5px;
    padding: 2px 6px;
    min-width: 24px;
    text-align: center;
    margin-top: 1px;
    flex-shrink: 0;
  }

  .hm-result-name {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .hm-result-addr {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    margin-top: 3px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .hm-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    flex: 1;
  }

  .hm-empty-icon { font-size: 36px; opacity: 0.4; }
  .hm-empty-text { font-size: 13px; color: rgba(255,255,255,0.25); text-align: center; line-height: 1.6; }

  /* Map area */
  .hm-map-area {
    flex: 1;
    position: relative;
  }

  /* Top floating bar */
  .hm-float-bar {
    position: absolute;
    top: 16px;
    left: 16px;
    right: 16px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
  }

  .hm-badge {
    background: rgba(15, 17, 23, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.2px;
    display: flex;
    align-items: center;
    gap: 7px;
    pointer-events: auto;
  }

  .hm-badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.3); }
  }

  /* Loading spinner overlay */
  .hm-loading-overlay {
    position: absolute;
    inset: 0;
    background: rgba(15,17,23,0.6);
    backdrop-filter: blur(4px);
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    transition: opacity 0.3s;
  }

  .hm-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255,255,255,0.15);
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Custom marker */
  .hm-marker {
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #ef4444, #dc2626);
    border: 2.5px solid #fff;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .hm-marker:hover { transform: rotate(-45deg) scale(1.15); }

  .hm-marker-inner {
    transform: rotate(45deg);
    font-size: 14px;
    line-height: 1;
  }

  /* Style Switcher */
  .hm-style-switcher {
    position: absolute;
    bottom: 16px;
    left: 16px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .hm-style-btn {
    background: rgba(19, 21, 28, 0.92);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 10px 14px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    white-space: nowrap;
  }

  .hm-style-btn:hover {
    background: rgba(30, 32, 48, 0.98);
    border-color: rgba(99, 102, 241, 0.4);
  }

  .hm-style-trigger {
    background: rgba(19, 21, 28, 0.92);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 10px 16px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  }

  .hm-style-trigger:hover {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 4px 20px rgba(99,102,241,0.2);
  }

  .hm-style-panel {
    background: rgba(19, 21, 28, 0.96);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    min-width: 200px;
    animation: fadeSlideUp 0.18s ease;
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hm-style-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
    border: 1px solid transparent;
  }

  .hm-style-option:hover {
    background: rgba(255,255,255,0.06);
  }

  .hm-style-option.active {
    background: rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.35);
  }

  .hm-style-option-icon { font-size: 16px; }

  .hm-style-option-text { flex: 1; }
  .hm-style-option-label {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
  }
  .hm-style-option-desc {
    font-size: 10px;
    color: rgba(255,255,255,0.3);
    margin-top: 1px;
  }

  .hm-style-check {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
  }


  .maplibregl-popup-content {
    font-family: 'DM Sans', sans-serif !important;
    background: #1e2030 !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
    padding: 14px 16px !important;
    color: #fff !important;
    min-width: 220px;
  }

  .maplibregl-popup-tip {
    border-top-color: #1e2030 !important;
  }

  .maplibregl-popup-close-button {
    color: rgba(255,255,255,0.4) !important;
    font-size: 18px !important;
    top: 8px !important;
    right: 10px !important;
  }

  .maplibregl-popup-close-button:hover {
    color: #fff !important;
    background: transparent !important;
  }

  /* Nav control override */
  .maplibregl-ctrl-group {
    background: rgba(19, 21, 28, 0.95) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 10px !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4) !important;
    overflow: hidden;
  }

  .maplibregl-ctrl-group button {
    background: transparent !important;
    border-color: rgba(255,255,255,0.06) !important;
  }

  .maplibregl-ctrl-group button span {
    filter: invert(1) !important;
  }

  .maplibregl-ctrl-group button:hover {
    background: rgba(255,255,255,0.08) !important;
  }
`;

const MAP_STYLES = [
    {
        id: 'liberty',
        label: 'Standard',
        icon: '🗺️',
        url: 'https://tiles.openfreemap.org/styles/liberty',
        desc: 'Classic street map'
    },
    {
        id: 'bright',
        label: 'Bright',
        icon: '☀️',
        url: 'https://tiles.openfreemap.org/styles/bright',
        desc: 'High contrast streets'
    },
    {
        id: 'dark',
        label: 'Dark',
        icon: '🌙',
        url: 'https://tiles.openfreemap.org/styles/dark',
        desc: 'Dark night mode'
    },
    {
        id: 'positron',
        label: 'Minimal',
        icon: '⬜',
        url: 'https://tiles.openfreemap.org/styles/positron',
        desc: 'Clean minimal style'
    },
    {
        id: 'fiord',
        label: 'Fiord',
        icon: '🌊',
        url: 'https://tiles.openfreemap.org/styles/fiord',
        desc: 'Ocean-toned style'
    },
    {
        id: 'satellite',
        label: 'Satellite',
        icon: '🛰️',
        url: 'satellite',
        desc: 'Real world imagery'
    },
    {
        id: 'terrain',
        label: 'Terrain',
        icon: '⛰️',
        url: 'terrain',
        desc: 'Nature and elevation'
    }
] as const;

type StyleId = typeof MAP_STYLES[number]['id'];

export default function GlobalHospitalMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markers = useRef<maplibregl.Marker[]>([]);
    const [searchQuery, setSearchQuery] = useState('hospitals near Kathmandu');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<HospitalResult[]>([]);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const markerRefs = useRef<maplibregl.Marker[]>([]);
    const [activeStyle, setActiveStyle] = useState<StyleId>('liberty');
    const [stylePickerOpen, setStylePickerOpen] = useState(false);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [85.3240, 27.7172],
            zoom: 13,
        });

        map.current.on('error', () => {
            toast.error('Map failed to load. Check your internet connection.');
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'bottom-right');

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    const searchHospitals = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!map.current) return;

        setLoading(true);
        setActiveIdx(null);

        markers.current.forEach(m => m.remove());
        markers.current = [];
        markerRefs.current = [];

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=15`
            );
            const data: HospitalResult[] = await response.json();

            if (data.length > 0) {
                setResults(data);
                const bounds = new maplibregl.LngLatBounds();

                data.forEach((hospital, idx) => {
                    const lat = parseFloat(hospital.lat);
                    const lon = parseFloat(hospital.lon);

                    const el = document.createElement('div');
                    el.className = 'hm-marker';
                    el.innerHTML = `<div class="hm-marker-inner">+</div>`;

                    const popup = new maplibregl.Popup({ offset: 30, closeButton: true })
                        .setHTML(`
                            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:rgba(239,68,68,0.8);margin-bottom:6px;">Medical Facility #${idx + 1}</div>
                            <div style="font-size:13px;font-weight:500;color:#fff;line-height:1.5;">${hospital.display_name.split(',').slice(0, 2).join(',')}</div>
                            <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;">${hospital.display_name.split(',').slice(2).join(',').trim()}</div>
                        `);

                    const marker = new maplibregl.Marker({ element: el })
                        .setLngLat([lon, lat])
                        .setPopup(popup)
                        .addTo(map.current!);

                    el.addEventListener('click', () => setActiveIdx(idx));

                    markers.current.push(marker);
                    markerRefs.current.push(marker);
                    bounds.extend([lon, lat]);
                });

                map.current.fitBounds(bounds, { padding: 60 });
            } else {
                toast.error("No results found. Try 'Hospitals in [Your City]'");
                setResults([]);
            }
        } catch {
            toast.error('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const flyToResult = (idx: number) => {
        const r = results[idx];
        if (!map.current || !r) return;
        setActiveIdx(idx);
        map.current.flyTo({
            center: [parseFloat(r.lon), parseFloat(r.lat)],
            zoom: 16,
            speed: 1.4,
            curve: 1.2,
        });
        markerRefs.current[idx]?.togglePopup();
    };

    const switchStyle = (styleId: StyleId) => {
        if (!map.current) return;
        const styleDef = MAP_STYLES.find(s => s.id === styleId);
        if (!styleDef) return;

        setActiveStyle(styleId);
        setStylePickerOpen(false);

        let style: string | maplibregl.StyleSpecification;

        if (styleId === 'satellite') {
            style = {
                version: 8,
                sources: {
                    'satellite': {
                        type: 'raster',
                        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
                        tileSize: 256,
                        attribution: 'Esri, Maxar, Earthstar Geographics, and the GIS User Community'
                    }
                },
                layers: [{ id: 'satellite-layer', type: 'raster', source: 'satellite', minzoom: 0, maxzoom: 20 }]
            };
        } else if (styleId === 'terrain') {
            style = {
                version: 8,
                sources: {
                    'terrain': {
                        type: 'raster',
                        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'],
                        tileSize: 256,
                        attribution: 'Esri, USGS, NOAA'
                    }
                },
                layers: [{ id: 'terrain-layer', type: 'raster', source: 'terrain', minzoom: 0, maxzoom: 20 }]
            };
        } else {
            style = styleDef.url;
        }

        // Re-add markers after style loads
        const currentResults = results;
        map.current.setStyle(style);

        map.current.once('styledata', () => {
            markers.current.forEach(m => m.remove());
            markers.current = [];
            markerRefs.current = [];
            if (currentResults.length > 0) {
                currentResults.forEach((hospital, idx) => {
                    const lat = parseFloat(hospital.lat);
                    const lon = parseFloat(hospital.lon);
                    const el = document.createElement('div');
                    el.className = 'hm-marker';
                    el.innerHTML = `<div class="hm-marker-inner">+</div>`;
                    const popup = new maplibregl.Popup({ offset: 30, closeButton: true })
                        .setHTML(`
                            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:rgba(239,68,68,0.8);margin-bottom:6px;">Medical Facility #${idx + 1}</div>
                            <div style="font-size:13px;font-weight:500;color:#fff;line-height:1.5;">${hospital.display_name.split(',').slice(0, 2).join(',')}</div>
                            <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;">${hospital.display_name.split(',').slice(2).join(',').trim()}</div>
                        `);
                    const marker = new maplibregl.Marker({ element: el })
                        .setLngLat([lon, lat])
                        .setPopup(popup)
                        .addTo(map.current!);
                    el.addEventListener('click', () => setActiveIdx(idx));
                    markers.current.push(marker);
                    markerRefs.current.push(marker);
                });
            }
        });
    };

    // Extract short name
    const shortName = (name: string) => name.split(',')[0];

    return (
        <>
            <style>{styles}</style>
            <div className="hospital-map-root">
                {/* Sidebar */}
                <div className="hm-sidebar">
                    <div className="hm-sidebar-header">
                        <div className="hm-logo">
                            <div className="hm-logo-icon">🏥</div>
                            <div>
                                <div className="hm-logo-text">MediLocate</div>
                                <div className="hm-logo-sub">Hospital Finder</div>
                            </div>
                        </div>
                        <form onSubmit={searchHospitals} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            <div className="hm-search-wrap">
                                <span className="hm-search-icon">⌕</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search hospitals, clinics..."
                                    className="hm-search-input"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="hm-search-btn" style={{ marginTop: '10px' }}>
                                {loading ? (
                                    <><div className="hm-spinner" style={{ borderTopColor: '#fff', width: 16, height: 16 }} /> Searching…</>
                                ) : (
                                    <> Search Nearby</>
                                )}
                            </button>
                        </form>
                    </div>

                    {results.length > 0 && (
                        <div className="hm-results-header">{results.length} facilities found</div>
                    )}

                    <div className="hm-results-list">
                        {results.length === 0 ? (
                            <div className="hm-empty-state">
                                <div className="hm-empty-icon">🗺️</div>
                                <div className="hm-empty-text">Search for hospitals, clinics, or medical centres near any location.</div>
                            </div>
                        ) : (
                            results.map((r, idx) => (
                                <div
                                    key={r.place_id}
                                    className={`hm-result-card${activeIdx === idx ? ' active' : ''}`}
                                    onClick={() => flyToResult(idx)}
                                >
                                    <div className="hm-result-num">{idx + 1}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div className="hm-result-name">{shortName(r.display_name)}</div>
                                        <div className="hm-result-addr">{r.display_name.split(',').slice(1, 3).join(', ')}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Map */}
                <div className="hm-map-area">
                    {/* Floating status bar */}
                    <div className="hm-float-bar">
                        <div className="hm-badge">
                            <div className="hm-badge-dot" />
                            {loading ? 'Searching…' : results.length > 0 ? `${results.length} locations plotted` : 'Ready to search'}
                        </div>
                        {activeIdx !== null && (
                            <div className="hm-badge" style={{ fontSize: 11 }}>
                                📍 {shortName(results[activeIdx].display_name)}
                            </div>
                        )}
                    </div>

                    {loading && (
                        <div className="hm-loading-overlay">
                            <div className="hm-spinner" />
                            Finding nearby facilities…
                        </div>
                    )}

                    {/* Map Style Switcher — bottom-left, panel opens upward */}
                    <div className="hm-style-switcher">
                        {stylePickerOpen && (
                            <div className="hm-style-panel">
                                {MAP_STYLES.map(s => (
                                    <div
                                        key={s.id}
                                        className={`hm-style-option${activeStyle === s.id ? ' active' : ''}`}
                                        onClick={() => switchStyle(s.id)}
                                    >
                                        <span className="hm-style-option-icon">{s.icon}</span>
                                        <div className="hm-style-option-text">
                                            <div className="hm-style-option-label">{s.label}</div>
                                            <div className="hm-style-option-desc">{s.desc}</div>
                                        </div>
                                        {activeStyle === s.id && <div className="hm-style-check">✓</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            className="hm-style-trigger"
                            onClick={() => setStylePickerOpen(o => !o)}
                        >
                            <span>{MAP_STYLES.find(s => s.id === activeStyle)?.icon}</span>
                            {MAP_STYLES.find(s => s.id === activeStyle)?.label}
                            <span style={{ opacity: 0.4, fontSize: 10 }}>{stylePickerOpen ? '▲' : '▼'}</span>
                        </button>
                    </div>

                    <div
                        ref={mapContainer}
                        style={{ height: '100%', width: '100%', background: '#0f1117' }}
                    />
                </div>
            </div>
        </>
    );
}