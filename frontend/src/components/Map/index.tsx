import React from 'react';
import {
    Pane,
    Circle,
    TileLayer,
    MapContainer
} from 'react-leaflet';

import styles from './map.module.css';

import 'leaflet/dist/leaflet.css';

export default function Map({ devices }: { devices: any[] }) {
    const Marker = ({ device }: { device: any }) => {
        const color = "blue";

        const eventHandlers = {
            click: (event: any) => console.log(event)
        };

        return (
            <Circle
                key={device.id} 
                center={[device.location.longitude, device.location.latitude]} 
                pathOptions={{ color }}
                eventHandlers={eventHandlers}
            />
        );
    }

    return (
        <MapContainer center={[42.65, 25.4]} zoom={8} className={styles.Map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Pane name='devices'>
                {devices.map(device => <Marker device={device} />)}
            </Pane>
        </MapContainer>
    );
}