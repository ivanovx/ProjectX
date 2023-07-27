import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default  withPageAuthRequired(async function Dashboard() {
    const { accessToken } = await getAccessToken();
    return <div>{accessToken}</div>;
});
