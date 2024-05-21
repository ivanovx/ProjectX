"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormik, FormikProvider } from "formik";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@mui/material';

import { createDeviceToken } from "@/modules/services/token-service";

import { SelectInput } from "../Input";

export default function CreateToken({ devices, token }: { devices: any[], token: string }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            device: {
                id: null,
                name: null
            },
        },
        onSubmit: async (values) => {
            try {
                const res = await createDeviceToken(token, `${values.device.id}`);

                console.log(res);

                formik.resetForm();

                router.push('/dashboard/tokens'); 
                setOpen(false);
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <FormikProvider value={formik}>
            <Button variant="outlined" onClick={() => setOpen(true)}>New Token</Button>
            <Dialog open={open} fullWidth={true} maxWidth="lg">
                <DialogTitle>New Token</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <SelectInput
                            name="device.id"
                            label="Device"
                            value={formik.values.device.id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.device?.id && Boolean(formik.errors.device?.id)}
                            helperText={formik.touched.device?.id && formik.errors.device?.id} 
                            items={devices} 
                        />
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