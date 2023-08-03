import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Measurements() {
    const { accessToken } = await getAccessToken();

    return (
        <h1>Measurements</h1>
    );
});