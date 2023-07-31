import DeviceService from '@/modules/services/device-service';
import CreateDevice from '@/modules/views/CreateDevice';
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Devices() {
    const { accessToken } = await getAccessToken();

    const devices = await getData(accessToken!);
 
    return (
        <>
            <h1>Devices</h1>
            {devices.map(device => JSON.stringify(device))}
            <CreateDevice token={accessToken!} />
        </>
    );
});


async function getData(token: string): Promise<any[]> {
    const res:  any = await DeviceService.getUserDevices(token);
    
    return res;
}