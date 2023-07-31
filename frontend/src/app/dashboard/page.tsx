import DeviceService from '@/modules/services/device-service';

import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import React from 'react';

export default withPageAuthRequired(async function Dashboard() {
    const { accessToken } = await getAccessToken();
    
    const devices = await getData(accessToken!);

    return (
        <ul>
            {devices.map(device => <li>{device.name}</li>)}
        </ul>     
    );
});

async function getData(token: string): Promise<any[]> {
    const res:  any = await DeviceService.getUserDevices(token);
    
    return res;
}