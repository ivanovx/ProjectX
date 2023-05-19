import React from 'react';
import { useFormik } from 'formik';
import DeviceService from '../../../modules/device-service';
import { useAuth } from '../../../components/Auth';
import { Button, Checkbox, TextField } from '@mui/material';

export default function Create() {
    const [coordinates, setCoordinates] = React.useState({ x: null, y: null });

    const auth = useAuth();
    const formik = useFormik({
        initialValues: {
            name: '',
            isOutdoor: false,
            coordinates: {
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
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <label>Outdoor</label>
                <Checkbox name="isOutdoor" checked={formik.values.isOutdoor} onChange={formik.handleChange} />
                <Button color="primary" variant="contained" fullWidth type="submit">Create device</Button>
            </form>
        </div>
       
    );
}