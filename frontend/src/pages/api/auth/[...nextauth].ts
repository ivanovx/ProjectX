import NextAuth from "next-auth"
import { OAuthConfig } from "next-auth/providers/oauth"
import { NextAuthOptions } from 'next-auth'
const defaultProvider: OAuthConfig<any> = {
    id: 'default',
    name: 'Default provider',
    version: '2.0',
    type: 'oauth',
    idToken: true,
    wellKnown: `${process.env.NEXTAUTH_ISSUER_URL}/.well-known/oauth-authorization-server`,
    clientId: process.env.NEXTAUTH_CLIENT_ID,
    clientSecret: process.env.NEXTAUTH_CLIENT_SECRET,
    authorization: {
        params: {
            grant_type: "authorization_code",
            scope: 'openid email profile',
        },
    },
    profile: (profile: any, token: any) => {
        console.log('profile', profile)
        console.log('token', token)

        return {
            id: profile.sub,
            name: profile.sub,
            email: profile.email,
           // ...token
        }
    },
}

export const authOptions: NextAuthOptions = {
    providers: [defaultProvider],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        session({ session, token }) {
          //  console.log(session);
           // console.log(token);
            //console.log(`Auth Sess = ${JSON.stringify(session)}`)
            //console.log(`Auth Tok = ${JSON.stringify(token)}`)
            //if (token.access_token) {
             //   session.access_token = token.access_token // Put the provider's access token in the session so that we can access it client-side and server-side with `auth()`
            //

            return {
                user: {
                    name: session.user?.name
                },
                token: {
                    ...token
                },
                expires: session.expires

                //...token,
                //...session,
                //user : {
                  //  name: session.user?.name
                //},
                //expires: session.expires
            }
        },
        //jwt({token, account, profile}) {
         //   console.log(`Auth JWT Tok = ${JSON.stringify(token)}`)
         //   console.log(`Router Auth JWT account = ${JSON.stringify(account)}`)

           // if (account) {
            //    token.access_token = account.access_token // Store the provider's access token in the token so that we can put it in the session in the session callback above
           // }

           // return token
        //}
    }
};

export default NextAuth(authOptions);