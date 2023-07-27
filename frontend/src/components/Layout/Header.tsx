"use client";
import { Button, Navbar } from "flowbite-react";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Header() {
    const { user,  error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;  

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    ProjectX
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {!user && <Button href="/api/auth/login">Login</Button>}
                {user && <span>Welcome {user.sub}! <Button href="/api/auth/logout">Logout</Button></span>}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link href="/stats">Stats</Navbar.Link>
                <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}