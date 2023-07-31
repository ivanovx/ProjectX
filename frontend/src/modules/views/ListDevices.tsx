'use client';

import { Button, Table } from 'flowbite-react';
import DeviceService from '../services/device-service';
import { error } from 'console';

type Props = {
    devices: any[];
    token: string;
}

export default function ListDevices({ devices, token }: Props) {
    const onActivate = (id: string) => {
        DeviceService
            .activateDevice(id, token)
            .then(device => console.log(device))
            .catch(error => console.log(error));
    };

    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Created on</Table.HeadCell>
                <Table.HeadCell>Activated on</Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {devices.map(device => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={device.id}>
                        <Table.Cell>{device.id}</Table.Cell>
                        <Table.Cell>{device.name}</Table.Cell>
                        <Table.Cell>{device.createdOn}</Table.Cell>
                        <Table.Cell>{device.activatedOn}</Table.Cell>
                        <Table.Cell>
                            {!device.activated && <Button onClick={() => onActivate(device.id)}>Activate</Button>}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
