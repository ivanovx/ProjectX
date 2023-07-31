import DeviceService from '@/modules/services/device-service';
import CreateDevice from '@/modules/views/CreateDevice';
import ListDevices from '@/modules/views/ListDevices';
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Devices() {
    const { accessToken } = await getAccessToken();

    const devices = await getData(accessToken!);
 
    return (
        <ListDevices devices={devices} token={accessToken!} />
    );
});


async function getData(token: string): Promise<any[]> {
    const res:  any = await DeviceService.getUserDevices(token);
    
    console.log(res)

    return res;
}