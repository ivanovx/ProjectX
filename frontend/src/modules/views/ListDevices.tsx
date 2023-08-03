'use client';

import React from 'react';
import { Button, Table } from 'flowbite-react';

import CreateDevice from './CreateDevice';
import DeviceService from "@/modules/services/device-service";  //'../services/device-service';

type Props = {
    token: string;
}

export default function ListDevices({ token }: Props) {
    const [devices, setDevices] = React.useState<any[]>([]);

    React.useEffect(() => {
        DeviceService
            .getUserDevices(token)
            .then((devices: any) => {
                setDevices(devices);
            })
            .catch(error => console.log(error));
    }, []);

    const onActivate = (id: string) => {
        DeviceService
            .activateDevice(id, token)
            .then(device => console.log(device))
            .catch(error => console.log(error));
    };

    return (
        <>
            <CreateDevice token={token} />
            <Table className="my-2">
                <Table.Head>
                    <Table.HeadCell>Id</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Created</Table.HeadCell>
                    <Table.HeadCell>Modified</Table.HeadCell>
                    <Table.HeadCell>Activated</Table.HeadCell>
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
                            <Table.Cell>{device.created}</Table.Cell>
                            <Table.Cell>{device.modified}</Table.Cell>
                            <Table.Cell>{device.activated}</Table.Cell>
                            <Table.Cell>
                                {!device.activated && <Button onClick={() => onActivate(device.id)}>Activate</Button>}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}
