'use client';

import { ListGroup } from 'flowbite-react';

export default function Sidebar() {
    return (
        <ListGroup>
            <ListGroup.Item href="/dashboard/devices">Devices</ListGroup.Item>
            <ListGroup.Item href="/dashboard/tokens">Tokens</ListGroup.Item>
            <ListGroup.Item href="/dashboard/measurements">Measurements</ListGroup.Item>
        </ListGroup>
    );
}