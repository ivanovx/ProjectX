import React from 'react';
import DeviceService from '../../../modules/device-service';
import { useAuth } from '../../../components/Auth';

export default function Create() {
    const auth = useAuth();

    const onCreateDevice = (e: React.SyntheticEvent) => {
        e.preventDefault();

        DeviceService.createDevice({
            title: "Sample device " + Date.now(),
            coordinates: {
                x: 100,
                y: 100,
            }
        }, auth.token).then(console.log).catch(console.log);
    };

    return (
        <button onClick={onCreateDevice}>Create Device</button>
    );
}