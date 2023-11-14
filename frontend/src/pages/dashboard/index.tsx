import { API_URL } from "@/modules/apiConfig";
import axios from "axios";
import React from "react";

import { getAccessToken } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Dashboard(props: any) {
   const [devices, setDevices] = React.useState<any[]>([]);

   React.useEffect(() => {
        axios
            .get(`${API_URL}/devices/all`)
            .then(res => {
                console.log(res.data);
                setDevices(res.data);
            })
   }, []);

    return (
        <div>
            {props.foo}
            {devices.map(device => <p>{device.id}</p>)}
        </div>
    );
});

export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);
    return { props: { foo: 'bar' } };
  }