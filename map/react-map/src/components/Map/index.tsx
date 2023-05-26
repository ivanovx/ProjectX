import React from 'react';
import { Circle, MapContainer, Pane, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';

export default function Map() {
    return (
        <MapContainer center={[42.65, 25.4]} zoom={7} className={styles.Map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Pane name='default'>
                <Circle center={[42.65, 25.4]} radius={500} pathOptions={{ color: 'blue' }} />
            </Pane>
            <LocalMap />
        </MapContainer>
    );
}

function LocalMap() {
    const map = useMapEvents({
        click: (e) => {
            console.log(e)
            map.locate()
        }
    });

    return null;
}

