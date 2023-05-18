import React from 'react';
import { useFormik } from 'formik';
import DeviceService from '../../../modules/device-service';
import { useAuth } from '../../../components/Auth';
import { Button, TextField } from '@mui/material';

export default function Create() {
    const [coordinates, setCoordinates] = React.useState({ x: null, y: null });

    const auth = useAuth();
    const formik = useFormik({
        initialValues: {
            title: '',
            cordinates: {
                x: 0,
                y: 0,
            },
        },
        onSubmit: (values) => {
            const device = {
                ...values,
                coordinates
            };

            DeviceService
                .createDevice(device, auth.token!.accessToken)
                .then(console.log)
                .catch(console.log);
        }
    });

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            setCoordinates({
                x: position.coords.latitude,
                y: position.coords.longitude
            });
        });
    };

    return (
        <div>
             <Button onClick={getCurrentLocation}>Get current location</Button>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">Create device</Button>
            </form>
        </div>
       
    );
}