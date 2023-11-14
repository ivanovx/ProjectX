import React from "react";
import { useFormik } from 'formik';
import { Button, Container, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";


export default function SignIn() {
    const auth = useAuth();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: userData => auth.signIn(userData)
    });

    return (
        <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />
                <Button color="primary" variant="contained" fullWidth type="submit">Sign In</Button>
            </form>
        </Container>
    );
}