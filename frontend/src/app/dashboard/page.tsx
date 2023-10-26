import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

import React from 'react';
/*
export default withPageAuthRequired(async function Dashboard() {
    const { accessToken } = await getAccessToken();

    return (
      <h1>Dashboard</h1>   
    );
});*/


export default function Dashboard() {
    return (
        <h1>Dashboard</h1>
    );
}