"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormik, FormikProvider, FieldArray } from "formik";

import {
    Stack,
    Button,
    Dialog,
    TextField,
    DialogTitle,
    DialogActions,
    DialogContent
} from '@mui/material';

import { createDevice, updateDevice } from "@/modules/services/device-service";

import { CONTROLLERS } from "@/modules/mock";
import Search from "../Search";
import { SelectInput, TextInput } from "../Input";

type DeviceActionsProps = {
    accessToken: string;
    device: any;
    action: "create" | "update";
}

export default function DeviceActions({ accessToken, device, action }: DeviceActionsProps) {
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
        initialValues: device,
        onSubmit: async (values) => {
            if (action === "create") {
                const deviceData = {
                    ...values,
                    location
                };

                const res = await createDevice(accessToken, deviceData);
                console.log(res);
            } else if (action === "update") {
                const deviceData = {
                    ...values
                };

                const res = await updateDevice(accessToken, deviceData.id, deviceData);
                console.log(res);
            }

            formik.resetForm();
            router.push('/dashboard/devices');
            setOpen(false);
        },
    });

    return (
        <FormikProvider value={formik}>
            <Button variant="outlined" onClick={() => setOpen(true)}>{action === "create" ? "New device" : "Update"}</Button>
            <Dialog open={open} fullWidth={true} maxWidth="lg">
                <DialogTitle>{action === "create" ? "New device" : "Update device"}</DialogTitle>
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
                                name="description.controller"
                                label="Controller"
                                value={formik.values.description.controller}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description?.controller && Boolean(formik.errors.description?.controller)}
                                helperText={formik.touched.description?.controller && formik.errors.description?.controller} 
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
                        {action === "create" && <Search onSelectValue={onSelectLocation} />}
                        <FieldArray name="description.sensors">
                            {({ push, remove }) => (
                                <Stack direction="row" spacing={2} mb={5}>
                                    {formik.values.description.sensors.length > 0 && formik.values.description.sensors.map((sensor: string, index: number) => (
                                        <div key={index}>
                                            <TextField
                                                fullWidth
                                                label="Sensor"
                                                name={`description.sensors.${index}`}
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
                    <Button onClick={() => formik.submitForm()}>{action === "create" ? "New device" : "Update device"}</Button>
                </DialogActions>
            </Dialog>
        </FormikProvider>
    );
}