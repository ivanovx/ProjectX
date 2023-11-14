import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Tokens() {
    const { accessToken } = await getAccessToken();

    return (
        <h1>Pesonal tokens</h1>
    );
});