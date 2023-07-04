import React, { useState } from 'react';
import { Circle, MapContainer, Marker, Pane, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';
import { LatLngExpression } from 'leaflet';

type Props = {
    children: React.ReactNode;
};

export default function Map() {
    return (
        <MapContainer center={[42.65, 25.4]} zoom={7} className={styles.Map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocalMap />
        </MapContainer>
    );
}

// Ready
function SelectionMap() {
    const [position, setPosition] = useState<LatLngExpression>({ lat: 0, lng: 0 });

    const map = useMapEvents({
        click: (e) => {
            console.log(e)

            setPosition(e.latlng);

            map.locate();
        },
        dblclick: (e) => {
            setPosition({ lat: 0, lng: 0 });
        }
    });

    return (
        <Marker position={position}>
            <Popup>
                Use selected position: {JSON.stringify(position)}
            </Popup>
      </Marker>
    );
}

function LocalMap() {
    const onSelectCircle = (e: any) => {
        console.log(e);
    };

    return (
        <Pane name='default'>
            <Circle
                attribution='device-id'
                center={[42.65, 25.4]} 
                radius={500} 
                pathOptions={{ color: 'blue' }} 
                eventHandlers={{
                    click: onSelectCircle
                }}
            />
        </Pane>
    );
}

