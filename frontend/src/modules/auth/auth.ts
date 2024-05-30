import { getServerSession } from "next-auth";

import { authOptions } from "./authOptions";

export const getSession = async () => getServerSession(authOptions);

export const getAccessToken = async () => {
    const session = await getSession();

    if (session == null) {
        throw "Session are null!";
    }

    return session.token.access_token;
};