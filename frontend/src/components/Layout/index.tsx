import { Outlet } from 'react-router-dom';
import { Button, Navbar,Footer } from 'flowbite-react';

import RootLayout from './Root';
import useUser from '../../hooks/useUser';

export default function Layout() {
    const user = useUser();

    return (
        <RootLayout requireAuth={false}>
            <div className="mx-auto max-w-7xl">
                <Navbar fluid rounded>
                    <Navbar.Brand href="/">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            ProjectX
                        </span>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        <Button>Login</Button>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <Navbar.Link href="/">Home</Navbar.Link>
                        <Navbar.Link href="/stats">Stats</Navbar.Link>
                        <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
                <Outlet />
                <Footer container className="my-3">
                    <Footer.Copyright
                        by="ProjectX"
                        href="/"
                        year={2023}
                    />
                    <Footer.LinkGroup>
                        <Footer.Link href="#">About</Footer.Link>
                        <Footer.Link href="#">Policy</Footer.Link>
                        <Footer.Link href="#">Contact</Footer.Link>
                        <Footer.Link href="#">Documentation</Footer.Link>
                    </Footer.LinkGroup>
                </Footer>
            </div>
        </RootLayout>
    );
}