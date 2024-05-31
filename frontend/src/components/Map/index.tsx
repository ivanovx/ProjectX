"use client";

import React from 'react';
import {
    Pane,
    Circle,
    TileLayer,
    MapContainer
} from 'react-leaflet';

import styles from './map.module.css';

import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';


// TODO
export default function Map({ devices }: { devices: any[] }) {
    const router = useRouter();
    
    const Marker = ({ device }: { device: any }) => {
        const color = "blue";

        const eventHandlers = {
            click: (event: any) => {
                console.log(event.target.options);
                const lat = event.target.options.lat;
                const lon = event.target.options.lon;
                //const lat = event.options.lat;
                //const lon = event.options.lon;
                //const id = (event.target as any).options.id;


                //getLatLng()

                console.log(lat + " : " + lon)
            
                router.push(`/stats?lat=${lat}&lon=${lon}`);
            }
        };

        return (
            <Circle
                lon={device.location.longitude}
                lat={device.location.latitude}
                pathOptions={{ color }}
                center={[device.location.longitude, device.location.latitude]} 
                eventHandlers={eventHandlers}
            />
        );
    }

    return (
        <MapContainer center={[42.65, 25.4]} zoom={8} className={styles.Map}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Pane name="devices">
                {devices.map(device => <Marker key={device.id} device={device} />)}
            </Pane>
        </MapContainer>
    );
}