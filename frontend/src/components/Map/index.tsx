import React from 'react';
import { Circle, MapContainer, Pane, TileLayer } from 'react-leaflet'

import styles from './map.module.css';

import 'leaflet/dist/leaflet.css'

export default function Map() {
    return (
        <MapContainer center={[42.65, 25.4]} zoom={7} className={styles.Map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Pane name='default'>
              
            </Pane>
        </MapContainer>
    );
}