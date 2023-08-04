"use client";

import { Footer as FlowbiteFooter } from "flowbite-react";

export default function Footer() {
    return (
        <FlowbiteFooter container className="my-3">
            <FlowbiteFooter.Copyright
                by="ProjectX"
                href="/"
                year={2023}
            />
            <FlowbiteFooter.LinkGroup>
                <FlowbiteFooter.Link href="#">About</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Policy</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Contact</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Documentation</FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
        </FlowbiteFooter>
    );
}