import DeviceService from '@/modules/device-service';
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Devices() {
    const { accessToken } = await getAccessToken();

    const devices = await getData(accessToken!);

    return (
        <>
            <h1>Devices</h1>
            <button>Create device</button>
            {devices.map(device => JSON.stringify(device))}
        </>
    );
});


async function getData(token: string): Promise<any[]> {
    const res:  any = await DeviceService.getUserDevices(token);
    
    return res;
}



async function sendData(token: string): Promise<any[]> {
    const res:  any = await DeviceService.createDevice({
        name: "test"
    }, token);
    
    return res;
}