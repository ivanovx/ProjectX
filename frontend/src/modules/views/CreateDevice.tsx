"use client";

import React from 'react';
import { useFormik } from 'formik';
import { Button, Modal } from 'flowbite-react';
import DeviceService from '../services/device-service';
import { CONTROLLERS, SENSORS } from '../mock';
import Search from '@/components/Search';
import { Check, Input, SelectList } from '@/components/Forms';

type Props = {
    userId: string;
    token: string;
}

export default function CreateDevice({ userId, token }: Props) {

    const [openModal, setOpenModal] = React.useState<string | undefined>();

    const formik = useFormik({
        initialValues: {
            name: '',
            outdoor: false,
            coordinates: {
                latitude: 0,
                longitude: 0,
            },
            sensors: [],
            controller: ''
        },
        onSubmit: (values) => {
            console.log(values);

            DeviceService
                .createDevice(values, userId, token)
                .then(device => console.log(device))
                .catch(error => console.log(error));
        }
    });

    const onSelectValue = (value: any) => {
        console.log(value);

        const coordinates = {
            latitude: value.y,
            longitude: value.x,
        };

        formik.setValues({
            ...formik.values,
            coordinates
        });
    };

    return (
        <>
            <Button onClick={() => setOpenModal('default')}>Create device</Button>
            <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                <Modal.Header>Create device</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            name="name"
                            label="Device name"
                            placeholder="Enter device name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        <Search onSelectValue={onSelectValue} />
                        <Check name="outdoor" label="Outdoor" value={formik.values.outdoor} onChange={formik.handleChange} />
                        <SelectList multiple name="sensors" label="Sensors" values={SENSORS} value={formik.values.sensors} onChange={formik.handleChange} />
                        <SelectList name="controller" label="Controller" values={CONTROLLERS} value={formik.values.controller} onChange={formik.handleChange} />
                        <Button type="submit">Create Device</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

/*


*/