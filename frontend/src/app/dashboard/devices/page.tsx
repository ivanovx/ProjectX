import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

//import ListDevices from '@/modules/views/ListDevices';

export default withPageAuthRequired(async function Devices() {
    const { accessToken } = await getAccessToken();

    return accessToken; //<ListDevices token={accessToken} />;
});