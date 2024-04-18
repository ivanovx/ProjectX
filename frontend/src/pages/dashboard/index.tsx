//import { API_URL } from "@/modules/apiConfig";
import React from "react";

import { getAccessToken } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import { getUserDevices } from "@/modules/device.service";

export default withPageAuthRequired(function Dashboard(props: any) {
   const [devices, setDevices] = React.useState<any[]>([]);

   React.useEffect(() => {
        getUserDevices(props.accessToken!).then(devices => setDevices(devices)).catch(err => console.log(err));
   }, []);

    return (
        <div>
            {devices.map(device => <p>{device.id}</p>)}
        </div>
    );
});

export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);

    return { props: { accessToken } };
  }