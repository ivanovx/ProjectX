import React from "react";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

//import { getToken } from "next-auth/jwt"

//import { getAccessToken } from '@auth0/nextjs-auth0';
//import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import { getUserDevices } from "@/modules/device.service";
import { Container } from "@mui/material";
import { Session } from "@auth0/nextjs-auth0";
import { getSession, useSession } from "next-auth/react";

export default function Dashboard({ devices }: any) {
    //const { data: session, status } = useSession()

    return devices.map(d => <li>{d.name}</li>);
};
export async function getServerSideProps({ req, res }: any) {

   // const { accessToken } = await getAccessToken(req, res);

   // const session = await getSession(ctx);

    //session?.

    //

    //return { props: { devices } };

    //const session = await getServerSession(req, res, authOptions);

    //const token = await getToken({req});

    //const session = await getServerSession(req, res, authOptions);

    const session = await getServerSession(req, res, authOptions);

    const { access_token } = session.token;
    const devices = await getUserDevices(access_token);
  //  console.log("Current session username: " + JSON.stringify(session.token.access_token));
    
    return {
        props: {
            devices
        }
    }
}