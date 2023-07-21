import { OAuth2Client, generateCodeVerifier } from '@badgateway/oauth2-client';

import { Button, Navbar } from 'flowbite-react';

export default function App() {

    const onLogin = async (e: Event) => {
        e.preventDefault();

        // https://gomakethings.com/using-oauth-with-fetch-in-vanilla-js/
    
        const client = new OAuth2Client({

            // The base URI of your OAuth2 server
            server: 'http://localhost:8000',
          
            // OAuth2 client id
            clientId: 'client',
          
            // OAuth2 client secret. Only required for 'client_credentials', 'password'
            // flows. You should not specify this for authorization_code.
            clientSecret: 'secret',
          
          
            // The following URIs are all optional. If they are not specified, we will
            // attempt to discover them using the oauth2 discovery document.
            // If your server doesn't have support this, you may need to specify these.
            // you may use relative URIs for any of these.
          
          
            // Token endpoint. Most flows need this.
            // If not specified we'll use the information for the discovery document
            // first, and otherwise default to /token
            tokenEndpoint: '/token',
          
            // Authorization endpoint.
            //
            // You only need this to generate URLs for authorization_code flows.
            // If not specified we'll use the information for the discovery document
            // first, and otherwise default to /authorize
            authorizationEndpoint: '/authorize',
          
            // OAuth2 Metadata discovery endpoint.
            //
            // This document is used to determine various server features.
            // If not specified, we assume it's on /.well-known/oauth2-authorization-server
           // discoveryEndpoint: '/.well-known/oauth2-authorization-server',
          });

          
          document.location = await client.authorizationCode.getAuthorizeUri({

            // URL in the app that the user should get redirected to after authenticating
            redirectUri: 'http://localhost:3000',
          
            // Optional string that can be sent along to the auth server. This value will
            // be sent along with the redirect back to the app verbatim.
           // state: 'some-string',
          
           // codeVerifier,
          
            scope: ['openid', 'profile'],
          
          });
    };

    return (
        <>
            <Navbar fluid rounded>
                <Navbar.Brand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ProjectX</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Button onClick={onLogin}>Login</Button>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="#">Home</Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}