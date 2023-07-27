import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
    providers: [
        Auth0Provider({
            clientId: 'client',
            clientSecret: 'secret',
            issuer: 'http://localhost:8000',
        })
    ],
}
export default NextAuth(authOptions)