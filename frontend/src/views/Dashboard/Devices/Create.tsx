import React, { useId } from 'react';
import { useFormik } from 'formik';
import DeviceService from '../../../modules/device-service';
import useAuth from '../../../hooks/useAuth';
import { Button, Label, TextInput } from 'flowbite-react';
import Search from '../../../components/Search';
import { useNavigate } from 'react-router-dom';

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
        },
        onSubmit: (values) => {
            console.log(values);

            DeviceService.createDevice(values, token!.accessToken).then(res => {
                console.log(res);
                navigate("/dashboard/devices");
            }).catch(err => console.log(err));
        }
    });

    const onSelectValue = (value) => {
        console.log(value);

        const coordinates = {
            latitude: value.y,
            longitude: value.x,
        };

        formik.setValues({
            ...formik.values,
            coordinates
        });
    }


    /*
        <label>Outdoor</label>
        <Checkbox name="isOutdoor" checked={formik.values.isOutdoor} onChange={formik.handleChange} />
    */

        /*
 <Button color="primary" variant="contained" fullWidth type="submit">Create device</Button>

        */

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

            <Button type="submit">Create Device</Button>
        </form>
    );
}


const Input =  React.forwardRef(function InputField({ label, value, ...props }: any, ref: any) {
    const id = useId();

    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={id}
                    value={label}
                    {...props}
                />
            </div>
            <TextInput
                id={id}
                type="text"
                value={value}
                {...props}
                ref={ref}
            />
        </>
    );
});

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