import React from 'react';
import {
    Pane,
    Circle,
    TileLayer,
    MapContainer
} from 'react-leaflet';

import styles from './map.module.css';

import 'leaflet/dist/leaflet.css';
import { redirect, useRouter } from 'next/navigation';

export default function Map({ devices }: { devices: any[] }) {
    const router = useRouter();
    
    const Marker = ({ device }: { device: any }) => {
        const color = "blue";

        const eventHandlers = {
            click: (event: Event) => {
                console.log(event.target);
                
                const id = (event.target as any).options.id; 

                router.push(`/stats/${id}`)
                //redirect(`/stats/${id}`)
            }
        };

        return (
            <Circle
                id={device.id}
                pathOptions={{ color }}
                center={[device.location.longitude, device.location.latitude]} 
                eventHandlers={eventHandlers}
            />
        );
    }

    return (
        <MapContainer center={[42.65, 25.4]} zoom={8} className={styles.Map}>
            <TileLayer
                //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Pane name='devices'>
                {devices.map(device => <Marker key={device.id} device={device} />)}
            </Pane>
        </MapContainer>
    );
}