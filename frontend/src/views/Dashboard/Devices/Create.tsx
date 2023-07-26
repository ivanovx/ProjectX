import React from 'react';
import { useFormik } from 'formik';
import DeviceService from '../../../modules/device-service';
import { Button, Checkbox, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { Label, TextInput } from 'flowbite-react';
import Search from '../../../components/Search';

export default function Create() {
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
            /*const device = {
                ...values,
                coordinates
            };*/

            // DeviceService
            //    .createDevice(device, auth.token!.accessToken)
            //    .then(console.log)
            //    .catch(console.log);

            console.log(values);
        }
    });

    const onSelectValue = (value) => {
        console.log(value);
    }


    /*
        <label>Outdoor</label>
        <Checkbox name="isOutdoor" checked={formik.values.isOutdoor} onChange={formik.handleChange} />
    */

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                name="name"
                label="Device name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />

            <Search onSelectValue={onSelectValue} />

            <Button color="primary" variant="contained" fullWidth type="submit">Create device</Button>
        </form>
    );
}

/*
function Input({ label, value, ...props }: any) {
    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor="small"
                    value="Small input"
                />
            </div>
            <TextInput
                id="small"
                sizing="sm"
                type="text"
                value={value}
            />
        </>
    );
}
*/
/*export default function Create() {
    const [coordinates, setCoordinates] = React.useState({ latitude: null, longitude: null });

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

    const getCurrentLocation = React.useCallback(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { coords : { latitude, longitude }} = position;

            console.log(position);

            setCoordinates({
                latitude,
                longitude,
            });
        });
    }, []);

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
}*/