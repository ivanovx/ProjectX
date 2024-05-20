"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormik, FormikProvider, FieldArray } from "formik";

import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Stack
} from '@mui/material';

import { createDevice } from "@/modules/services/device-service";

import { CONTROLLERS } from "@/modules/mock";
import Search from "../Search";
import { SelectInput, TextInput } from "../Input";

export default function CreateDevice({ token }: { token: string }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const [location, setLocation] = React.useState({
        latitude: 0.0,
        longitude: 0.0
    });

    const onSelectLocation = (coordinates: { x: number, y: number }) => {
        return setLocation({
            latitude: coordinates.x,
            longitude: coordinates.y
        });
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            controller: '',
            sensors: [],
            description: {
                indoor: false,
                trafficInArea: null,
                industryInArea: null
            }
        },
        onSubmit: async (values) => {
            const device = {
                ...values,
                location
            };

            try {
                const res = await createDevice(device, token);

                console.log(res);

                formik.resetForm();

                router.push('/dashboard/devices'); 
                setOpen(false);
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <FormikProvider value={formik}>
            <Button variant="outlined" onClick={() => setOpen(true)}>New device</Button>
            <Dialog open={open} fullWidth={true} maxWidth="lg">
                <DialogTitle>New device</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="row" spacing={2} mb={5}>
                            <TextInput
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <SelectInput
                                name="controller"
                                label="Controller"
                                value={formik.values.controller}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.controller && Boolean(formik.errors.controller)}
                                helperText={formik.touched.controller && formik.errors.controller} 
                                items={CONTROLLERS} 
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} mb={5}>
                            <TextInput
                                type="number"
                                name="description.trafficInArea"
                                label="Traffic in area"
                                value={formik.values.description.trafficInArea}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <TextInput
                                type="number"
                                name="description.industryInArea"
                                label="Industry in area"
                                value={formik.values.description.industryInArea}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Stack>
                        <Search onSelectValue={onSelectLocation} />
                        <FieldArray name="sensors">
                            {({ push, remove }) => (
                                <Stack direction="row" spacing={2} mb={5}>
                                    {formik.values.sensors.length > 0 && formik.values.sensors.map((sensor: string, index: number) => (
                                        <div key={index}>
                                            <TextField
                                                fullWidth
                                                label="Sensor"
                                                name={`sensors.${index}`}
                                                value={sensor}
                                                onChange={formik.handleChange}
                                            />
                                            <Button onClick={() => remove(index)}>X</Button>
                                        </div>
                                    ))}
                                    <Button variant="contained" onClick={() => push('')}>Add Sensor</Button>
                                </Stack>
                            )}
                        </FieldArray>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => formik.submitForm()}>Create</Button>
                </DialogActions>
            </Dialog>
        </FormikProvider>
    );
}