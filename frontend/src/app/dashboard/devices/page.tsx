import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

import ListDevices from '@/modules/views/ListDevices';

export default function Devices() {
   
    return <ListDevices token="aaa" />;
};