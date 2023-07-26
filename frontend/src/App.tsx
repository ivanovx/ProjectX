import { AuthProvider } from "oidc-react";

export default function App() {

    const oidcConfig = {
        onSignIn: () => {
          alert('ok')
        },
        authority: 'http://localhost:8000',
        clientId: 'client',
        clientSecret: 'secret',
        scopes: ['openid'],
        redirectUri: 'http://localhost:3000',
      };

    return (
        <AuthProvider {...oidcConfig}>
            <h1>Welcome!</h1>
        </AuthProvider>
    )
}
