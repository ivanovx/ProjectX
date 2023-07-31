"use client";
import React from 'react';
import { Circle, MapContainer, Pane, TileLayer } from 'react-leaflet'

export default function Map({ devices }: any) {
    const onSelectCircle = () => {};

    return (
        <MapContainer center={[42.65, 25.4]} zoom={7} className="w-full h-screen">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Pane name='default'>
                {devices.map(device => {
                    const center = {
                        lat: device.coordinates.latitude,
                        lng: device.coordinates.longitude
                    };

                    return (
                        <Circle
                            key={device.id}
                            attribution={device.id}
                            center={center}
                            radius={50}
                            pathOptions={{ color: 'blue' }}
                            eventHandlers={{
                                click: onSelectCircle
                            }}
                        />
                    );
                })}
            </Pane>
        </MapContainer>
    );
}