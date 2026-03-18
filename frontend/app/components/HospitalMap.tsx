'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { toast } from 'react-hot-toast';
import CategoryBar from './categorybar';

// ── Config — change if needed ─────────────────────────────────────────────────
const API_BASE = 'http://localhost:5000/hospitals';
// ─────────────────────────────────────────────────────────────────────────────

interface HospitalResult {
    _id: string;
    hospitalName: string;
    location: {
        type: string;
        coordinates: [number, number]; // [lon, lat]
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    contact: {
        phone: string;
        website: string;
    };
    status: string;
    lastUpdated: string;
}

type SearchMode = 'name' | 'nearby';

const MAP_STYLES = [
    { id: 'liberty', label: 'Standard', icon: '🗺️', url: 'https://tiles.openfreemap.org/styles/liberty', desc: 'Classic street map' },
    { id: 'bright', label: 'Bright', icon: '☀️', url: 'https://tiles.openfreemap.org/styles/bright', desc: 'High contrast streets' },
    { id: 'dark', label: 'Dark', icon: '🌙', url: 'https://tiles.openfreemap.org/styles/dark', desc: 'Dark night mode' },
    { id: 'positron', label: 'Minimal', icon: '⬜', url: 'https://tiles.openfreemap.org/styles/positron', desc: 'Clean minimal style' },
    { id: 'fiord', label: 'Fiord', icon: '🌊', url: 'https://tiles.openfreemap.org/styles/fiord', desc: 'Ocean-toned style' },
    { id: 'satellite', label: 'Satellite', icon: '🛰️', url: 'satellite', desc: 'Real world imagery' },
    { id: 'terrain', label: 'Terrain', icon: '⛰️', url: 'terrain', desc: 'Nature and elevation' },
] as const;

type StyleId = typeof MAP_STYLES[number]['id'];

// ── Styles ────────────────────────────────────────────────────────────────────
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

  .hm-sidebar {
    position: relative;
    z-index: 20;
    width: 360px;
    min-width: 360px;
    background: #13151c;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .hm-sidebar-header {
    padding: 24px 20px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .hm-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
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
    box-shadow: 0 4px 14px rgba(99,102,241,0.4);
    flex-shrink: 0;
  }

  .hm-logo-text { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
  .hm-logo-sub  { font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 400; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 1px; }

  .hm-mode-tabs {
    display: flex;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 3px;
    margin-bottom: 14px;
    gap: 2px;
  }

  .hm-mode-tab {
    flex: 1;
    padding: 8px 4px;
    border: none;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: rgba(255,255,255,0.4);
    background: transparent;
  }

  .hm-mode-tab.active {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: #fff;
    box-shadow: 0 2px 8px rgba(99,102,241,0.4);
  }

  .hm-mode-tab:hover:not(.active) {
    color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.05);
  }

  .hm-search-wrap { position: relative; }

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
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .hm-search-input::placeholder { color: rgba(255,255,255,0.25); }

  .hm-search-input:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(255,255,255,0.07);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }

  .hm-radius-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 2px;
  }

  .hm-radius-label { font-size: 12px; color: rgba(255,255,255,0.35); white-space: nowrap; }

  .hm-radius-select {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 8px;
    padding: 8px 10px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    cursor: pointer;
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
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(99,102,241,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .hm-search-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.5); }
  .hm-search-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .hm-results-header {
    padding: 14px 20px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .hm-results-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.28); }

  .hm-results-count {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: rgba(99,102,241,0.85);
    background: rgba(99,102,241,0.12);
    border-radius: 20px;
    padding: 2px 9px;
  }

  .hm-results-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .hm-results-list::-webkit-scrollbar { width: 3px; }
  .hm-results-list::-webkit-scrollbar-track { background: transparent; }
  .hm-results-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

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

  .hm-result-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(99,102,241,0.3); transform: translateX(2px); }
  .hm-result-card.active { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.5); }

  .hm-result-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    color: rgba(99,102,241,0.8);
    background: rgba(99,102,241,0.15);
    border-radius: 5px;
    padding: 2px 6px;
    min-width: 26px;
    text-align: center;
    margin-top: 1px;
    flex-shrink: 0;
  }

  .hm-result-name { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); line-height: 1.4; }
  .hm-result-addr { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 3px; }

  .hm-result-status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 500;
    margin-top: 5px;
    padding: 2px 7px;
    border-radius: 20px;
  }

  .hm-result-status.operational { background: rgba(34,197,94,0.12); color: rgba(34,197,94,0.9); }
  .hm-result-status.other       { background: rgba(239,68,68,0.12);  color: rgba(239,68,68,0.9); }

  .hm-status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

  .hm-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    gap: 12px;
    flex: 1;
  }

  .hm-empty-icon  { font-size: 36px; opacity: 0.35; }
  .hm-empty-text  { font-size: 13px; color: rgba(255,255,255,0.22); text-align: center; line-height: 1.6; }

  .hm-map-area { flex: 1; position: relative; }

  .hm-float-bar {
    position: absolute;
    top: 16px; left: 16px; right: 16px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
    gap: 10px;
  }

  .hm-badge {
    background: rgba(15,17,23,0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    display: flex;
    align-items: center;
    gap: 7px;
    pointer-events: auto;
    white-space: nowrap;
    overflow: hidden;
  }

  .hm-badge-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34,197,94,0.7);
    animation: pulse-dot 2s infinite;
    flex-shrink: 0;
  }

  @keyframes pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.6; transform:scale(1.3); }
  }

  .hm-user-marker {
    width: 16px; height: 16px;
    background: #3b82f6;
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.3), 0 4px 12px rgba(0,0,0,0.4);
    animation: user-pulse 2.5s infinite;
  }

  @keyframes user-pulse {
    0%,100% { box-shadow: 0 0 0 4px rgba(59,130,246,0.3), 0 4px 12px rgba(0,0,0,0.4); }
    50%      { box-shadow: 0 0 0 8px rgba(59,130,246,0.1), 0 4px 12px rgba(0,0,0,0.4); }
  }

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
  }

  .hm-spinner {
    width: 20px; height: 20px;
    border: 2px solid rgba(255,255,255,0.15);
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .hm-marker {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    border: 2px solid #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(99,102,241,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .hm-marker:hover { transform: scale(1.15); box-shadow: 0 6px 16px rgba(99,102,241,0.5); }
  .hm-marker.active-marker { background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 4px 16px rgba(16,185,129,0.7); border-color: #fff; }
  .hm-marker-inner { font-size: 16px; font-weight: 800; color: #fff; font-family: 'DM Sans', sans-serif; }

  .hm-style-switcher {
    position: absolute;
    bottom: 16px; left: 16px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .hm-style-trigger {
    background: rgba(19,21,28,0.92);
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

  .hm-style-trigger:hover { border-color: rgba(99,102,241,0.5); box-shadow: 0 4px 20px rgba(99,102,241,0.2); }

  .hm-style-panel {
    background: rgba(19,21,28,0.96);
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
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .hm-style-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
    border: 1px solid transparent;
  }

  .hm-style-option:hover  { background: rgba(255,255,255,0.06); }
  .hm-style-option.active { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.35); }

  .hm-style-option-icon  { font-size: 16px; }
  .hm-style-option-text  { flex: 1; }
  .hm-style-option-label { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); }
  .hm-style-option-desc  { font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 1px; }

  .hm-style-check {
    width: 16px; height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    display: flex; align-items: center; justify-content: center;
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
    min-width: 230px;
    max-width: 280px;
  }

  .maplibregl-popup-tip { border-top-color: #1e2030 !important; }
  .maplibregl-popup-close-button { color: rgba(255,255,255,0.4) !important; font-size: 18px !important; top: 8px !important; right: 10px !important; }
  .maplibregl-popup-close-button:hover { color: #fff !important; background: transparent !important; }

  .maplibregl-ctrl-group {
    background: rgba(19,21,28,0.95) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 10px !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4) !important;
    overflow: hidden;
  }

  .maplibregl-ctrl-group button { background: transparent !important; border-color: rgba(255,255,255,0.06) !important; }
  .maplibregl-ctrl-group button span { filter: invert(1) !important; }
  .maplibregl-ctrl-group button:hover { background: rgba(255,255,255,0.08) !important; }

  .hm-locate-btn {
    position: absolute;
    bottom: 120px;
    right: 12px;
    width: 44px;
    height: 44px;
    background: rgba(30, 32, 48, 0.9);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .hm-locate-btn:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.2);
  }

  .hm-locate-btn:active {
    transform: translateY(0);
  }

  .hm-locate-btn svg {
    width: 22px;
    height: 22px;
  }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildPopupHTML(h: HospitalResult, idx: number) {
    const isOp = h.status?.toLowerCase() === 'operational';
    return `
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:rgba(239,68,68,0.8);margin-bottom:8px;">
            Medical Facility #${idx + 1}
        </div>
        <div style="font-size:13px;font-weight:600;color:#fff;line-height:1.5;margin-bottom:6px;">
            ${h.hospitalName}
        </div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:6px;">
            📍 ${h.address?.street ?? ''}, ${h.address?.city ?? ''}, ${h.address?.state ?? ''}
        </div>
        ${h.contact?.phone ? `<div style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:4px;">📞 ${h.contact.phone}</div>` : ''}
        ${h.contact?.website ? `
        <div style="font-size:11px;margin-bottom:8px;">
            <a href="${h.contact.website}" target="_blank" rel="noopener noreferrer"
               style="color:rgba(99,102,241,0.9);text-decoration:none;">🌐 Visit Website</a>
        </div>` : ''}
        <div style="display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;
            background:${isOp ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'};
            color:${isOp ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)'};">
            <span style="width:5px;height:5px;border-radius:50%;background:currentColor;display:inline-block;"></span>
            ${h.status ?? 'Unknown'}
        </div>
    `;
}

function buildSatelliteStyle(): maplibregl.StyleSpecification {
    return {
        version: 8,
        sources: { satellite: { type: 'raster', tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'], tileSize: 256, attribution: 'Esri' } },
        layers: [{ id: 'satellite-layer', type: 'raster', source: 'satellite', minzoom: 0, maxzoom: 20 }]
    };
}

function buildTerrainStyle(): maplibregl.StyleSpecification {
    return {
        version: 8,
        sources: { terrain: { type: 'raster', tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'], tileSize: 256, attribution: 'Esri' } },
        layers: [{ id: 'terrain-layer', type: 'raster', source: 'terrain', minzoom: 0, maxzoom: 20 }]
    };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function GlobalHospitalMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markers = useRef<maplibregl.Marker[]>([]);
    const markerEls = useRef<HTMLElement[]>([]);
    const userMarker = useRef<maplibregl.Marker | null>(null);

    const [allHospitals, setAllHospitals] = useState<HospitalResult[]>([]);
    const [results, setResults] = useState<HospitalResult[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMode, setSearchMode] = useState<SearchMode>('name');
    const [maxDistance, setMaxDistance] = useState(5000);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [activeStyle, setActiveStyle] = useState<StyleId>('liberty');
    const [stylePicker, setStylePicker] = useState(false);
    const [dbCount, setDbCount] = useState(0);

    // ── Map init ──────────────────────────────────────────────────────────────
    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [85.3240, 27.7172],
            zoom: 12,
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'bottom-right');

        return () => { map.current?.remove(); map.current = null; };
    }, []);

    // ── Place markers ─────────────────────────────────────────────────────────
    const placeMarkers = useCallback((data: HospitalResult[]) => {
        if (!map.current) return;

        markers.current.forEach(m => m.remove());
        markers.current = [];
        markerEls.current = [];

        if (data.length === 0) return;

        const bounds = new maplibregl.LngLatBounds();

        data.forEach((h, idx) => {
            const [lon, lat] = h.location.coordinates;

            const el = document.createElement('div');
            el.className = 'hm-marker';
            el.innerHTML = `<div class="hm-marker-inner">H</div>`;

            const popup = new maplibregl.Popup({ offset: 30, closeButton: true })
                .setHTML(buildPopupHTML(h, idx));

            const marker = new maplibregl.Marker({ element: el })
                .setLngLat([lon, lat])
                .setPopup(popup)
                .addTo(map.current!);

            el.addEventListener('click', () => {
                setActiveIdx(idx);
                markerEls.current.forEach(e => e.classList.remove('active-marker'));
                el.classList.add('active-marker');
            });

            markers.current.push(marker);
            markerEls.current.push(el);
            bounds.extend([lon, lat]);
        });

        if (data.length > 1) {
            map.current.fitBounds(bounds, { padding: 80, maxZoom: 15 });
        } else {
            const [lon, lat] = data[0].location.coordinates;
            map.current.flyTo({ center: [lon, lat], zoom: 15 });
        }
    }, []);

    // ── Fetch all hospitals on mount ──────────────────────────────────────────
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await fetch(API_BASE);
                if (!res.ok) throw new Error(`Server error ${res.status}`);
                const data: HospitalResult[] = await res.json();
                setAllHospitals(data);
                setResults(data);
                setDbCount(data.length);

                const place = () => placeMarkers(data);
                if (map.current?.isStyleLoaded()) place();
                else map.current?.once('load', place);
            } catch (err) {
                console.error(err);
                toast.error('Could not connect to the hospital database. Is your Express server running on port 5000?');
            } finally {
                setInitialLoad(false);
            }
        };

        const t = setTimeout(fetchAll, 300);
        return () => clearTimeout(t);
    }, [placeMarkers]);

    // ── Name filter (client-side) ─────────────────────────────────────────────
    const handleNameSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = searchQuery.trim().toLowerCase();
        setActiveIdx(null);

        if (!q) {
            setResults(allHospitals);
            placeMarkers(allHospitals);
            return;
        }

        const filtered = allHospitals.filter(h =>
            h.hospitalName?.toLowerCase().includes(q) ||
            h.address?.city?.toLowerCase().includes(q) ||
            h.address?.street?.toLowerCase().includes(q) ||
            h.address?.state?.toLowerCase().includes(q) ||
            h.status?.toLowerCase().includes(q)
        );

        setResults(filtered);
        placeMarkers(filtered);

        if (filtered.length === 0) toast.error(`No hospitals match "${searchQuery}"`);
    };

    // Clear filter when input is emptied
    useEffect(() => {
        if (searchQuery === '' && searchMode === 'name') {
            setResults(allHospitals);
            placeMarkers(allHospitals);
            setActiveIdx(null);
        }
    }, [searchQuery, searchMode, allHospitals, placeMarkers]);

    // ── Nearby search ─────────────────────────────────────────────────────────
    const handleNearbySearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser.');
            return;
        }

        setLoading(true);
        setActiveIdx(null);

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                const { latitude, longitude } = coords;

                // Blue dot for user location
                if (userMarker.current) userMarker.current.remove();
                const userEl = document.createElement('div');
                userEl.className = 'hm-user-marker';
                userMarker.current = new maplibregl.Marker({ element: userEl })
                    .setLngLat([longitude, latitude])
                    .addTo(map.current!);

                map.current?.flyTo({ center: [longitude, latitude], zoom: 13, speed: 1.2 });

                try {
                    const url = `${API_BASE}/nearby/search?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`;
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`Server error ${res.status}`);
                    const data: HospitalResult[] = await res.json();

                    setResults(data);
                    placeMarkers(data);

                    if (data.length === 0) {
                        toast.error(`No hospitals found within ${maxDistance / 1000} km of your location.`);
                    } else {
                        toast.success(`Found ${data.length} hospital${data.length !== 1 ? 's' : ''} nearby`);
                    }
                } catch (err) {
                    console.error(err);
                    toast.error('Nearby search failed. Check your server.');
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
                if (err.code === err.PERMISSION_DENIED) {
                    toast.error('Location access denied. Please allow location permission in your browser.');
                } else {
                    toast.error('Could not get your location. Please try again.');
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    // ── Locate User ───────────────────────────────────────────────────────────
    const handleLocateUser = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser.');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;

                if (userMarker.current) userMarker.current.remove();
                const userEl = document.createElement('div');
                userEl.className = 'hm-user-marker';
                userMarker.current = new maplibregl.Marker({ element: userEl })
                    .setLngLat([longitude, latitude])
                    .addTo(map.current!);

                map.current?.flyTo({ center: [longitude, latitude], zoom: 15, speed: 1.5 });
                setLoading(false);
                toast.success('Centered on your location');
            },
            (err) => {
                setLoading(false);
                toast.error('Could not get your location. Please check permissions.');
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    // ── Fly to result ─────────────────────────────────────────────────────────
    const flyToResult = (idx: number) => {
        const h = results[idx];
        if (!map.current || !h) return;
        setActiveIdx(idx);

        markerEls.current.forEach(e => e.classList.remove('active-marker'));
        markerEls.current[idx]?.classList.add('active-marker');

        map.current.flyTo({
            center: [h.location.coordinates[0], h.location.coordinates[1]],
            zoom: 16, speed: 1.4, curve: 1.2,
        });
        markers.current[idx]?.togglePopup();
    };

    // ── Style switcher ────────────────────────────────────────────────────────
    const switchStyle = (styleId: StyleId) => {
        if (!map.current) return;
        const styleDef = MAP_STYLES.find(s => s.id === styleId);
        if (!styleDef) return;

        setActiveStyle(styleId);
        setStylePicker(false);

        let style: string | maplibregl.StyleSpecification;
        if (styleId === 'satellite') style = buildSatelliteStyle();
        else if (styleId === 'terrain') style = buildTerrainStyle();
        else style = styleDef.url;

        const currentResults = results;
        map.current.setStyle(style);
        map.current.once('styledata', () => placeMarkers(currentResults));
    };

    // ── Render ────────────────────────────────────────────────────────────────
    const activeHospital = activeIdx !== null ? results[activeIdx] : null;
    const isNearby = searchMode === 'nearby';

    return (
        <>
            <style>{styles}</style>
            <div className="hospital-map-root">

                {/* ── Sidebar ── */}
                <div className="hm-sidebar">
                    <div className="hm-sidebar-header">

                        <div className="hm-logo">
                            <div className="hm-logo-icon">🏥</div>
                            <div>
                                <div className="hm-logo-text">MediLocate</div>
                                <div className="hm-logo-sub">Hospital Finder</div>
                            </div>
                        </div>

                        {/* Mode toggle */}
                        <div className="hm-mode-tabs">
                            <button
                                type="button"
                                className={`hm-mode-tab${!isNearby ? ' active' : ''}`}
                                onClick={() => { setSearchMode('name'); setSearchQuery(''); }}
                            >
                                🔤 Search by Name
                            </button>
                            <button
                                type="button"
                                className={`hm-mode-tab${isNearby ? ' active' : ''}`}
                                onClick={() => setSearchMode('nearby')}
                            >
                                📍 Search Nearby
                            </button>
                        </div>

                        {/* Name search */}
                        {!isNearby && (
                            <form onSubmit={handleNameSearch} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="hm-search-wrap">
                                    <span className="hm-search-icon">⌕</span>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Hospital name, city, status…"
                                        className="hm-search-input"
                                    />
                                </div>
                                <button type="submit" disabled={initialLoad} className="hm-search-btn" style={{ marginTop: 10 }}>
                                    🔍 Filter Results
                                </button>
                            </form>
                        )}

                        {/* Nearby search */}
                        {isNearby && (
                            <form onSubmit={handleNearbySearch} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="hm-radius-row">
                                    <span className="hm-radius-label">Radius:</span>
                                    <select
                                        className="hm-radius-select"
                                        value={maxDistance}
                                        onChange={e => setMaxDistance(Number(e.target.value))}
                                    >
                                        <option value={1000}>1 km</option>
                                        <option value={2000}>2 km</option>
                                        <option value={5000}>5 km</option>
                                        <option value={10000}>10 km</option>
                                        <option value={20000}>20 km</option>
                                        <option value={50000}>50 km</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={loading || initialLoad} className="hm-search-btn" style={{ marginTop: 10 }}>
                                    {loading
                                        ? <><div className="hm-spinner" style={{ borderTopColor: '#fff', width: 16, height: 16 }} /> Locating…</>
                                        : <>📍 Use My Location</>
                                    }
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Results header */}
                    {!initialLoad && (
                        <div className="hm-results-header">
                            <span className="hm-results-label">
                                {isNearby ? 'Nearby Facilities' : 'All Facilities'}
                            </span>
                            <span className="hm-results-count">{results.length} shown</span>
                        </div>
                    )}

                    {/* Results list */}
                    <div className="hm-results-list">
                        {initialLoad ? (
                            <div className="hm-empty-state">
                                <div className="hm-spinner" style={{ width: 28, height: 28 }} />
                                <div className="hm-empty-text">Loading from database…</div>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="hm-empty-state">
                                <div className="hm-empty-icon">🏥</div>
                                <div className="hm-empty-text">
                                    {allHospitals.length === 0
                                        ? 'No hospitals found in your database.'
                                        : isNearby
                                            ? 'No hospitals found in this radius. Try increasing the distance.'
                                            : 'No hospitals match your search.'}
                                </div>
                            </div>
                        ) : (
                            results.map((h, idx) => {
                                const isOp = h.status?.toLowerCase() === 'operational';
                                return (
                                    <div
                                        key={h._id}
                                        className={`hm-result-card${activeIdx === idx ? ' active' : ''}`}
                                        onClick={() => flyToResult(idx)}
                                    >
                                        <div className="hm-result-num">{idx + 1}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div className="hm-result-name">{h.hospitalName}</div>
                                            <div className="hm-result-addr">
                                                {h.address?.street}, {h.address?.city}
                                            </div>
                                            <div className={`hm-result-status ${isOp ? 'operational' : 'other'}`}>
                                                <span className="hm-status-dot" />
                                                {h.status ?? 'Unknown'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ── Map ── */}
                <div className="hm-map-area">

        
                        <CategoryBar />
                    

                    <button
                        className="hm-locate-btn"
                        onClick={handleLocateUser}
                        title="My Location"
                        aria-label="Find my location"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </button>

                    {(initialLoad || loading) && (
                        <div className="hm-loading-overlay">
                            <div className="hm-spinner" />
                            {initialLoad ? 'Loading hospital data…' : 'Searching nearby hospitals…'}
                        </div>
                    )}

                    {/* Style switcher */}
                    <div className="hm-style-switcher">
                        {stylePicker && (
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
                        <button className="hm-style-trigger" onClick={() => setStylePicker(o => !o)}>
                            <span>{MAP_STYLES.find(s => s.id === activeStyle)?.icon}</span>
                            {MAP_STYLES.find(s => s.id === activeStyle)?.label}
                            <span style={{ opacity: 0.4, fontSize: 10 }}>{stylePicker ? '▲' : '▼'}</span>
                        </button>
                    </div>

                    <div ref={mapContainer} style={{ height: '100%', width: '100%', background: '#0f1117' }} />
                </div>
            </div>
        </>
    );
}