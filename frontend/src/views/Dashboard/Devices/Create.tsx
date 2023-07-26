import React from 'react';
import { useFormik } from 'formik';
import DeviceService from '../../../modules/device-service';
import useAuth from '../../../hooks/useAuth';
import { Button } from 'flowbite-react';
import Search from '../../../components/Search';
import { useNavigate } from 'react-router-dom';
import { Check, Input, SelectList } from '../../../components/Forms';
import { CONTROLLERS, SENSORS } from '../../../modules/mock';

export default function Create() {
    const navigate = useNavigate();
    const { token } = useAuth();

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

            DeviceService.createDevice(values, token!.accessToken).then(res => {
                console.log(res);
                navigate("/dashboard/devices");
            }).catch(err => console.log(err));
        }
    });

    const onSelectValue = React.useCallback((value: any) => {
        console.log(value);

        const coordinates = {
            latitude: value.y,
            longitude: value.x,
        };

        formik.setValues({
            ...formik.values,
            coordinates
        });
    }, []);

    return (
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
    );
}