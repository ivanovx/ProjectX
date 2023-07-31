"use client";

import { Input } from "@/components/Forms";
import UserService from "@/modules/services/user-service";
import { Button, Card } from "flowbite-react";
import { useFormik } from "formik";

export default function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        onSubmit: userData => {
            UserService
                .signUp(userData)
                .then(user => console.log(user))
                .catch(error => console.log(error));
        }
    });

    return (
        <div className="mx-auto my-5 w-4/5">
            <Card>
                <div className="mx-auto w-72">
                    <h5 className="text-2xl my-2 font-bold tracking-tight text-gray-900 text-center">Already have account?</h5>
                    <Button href="/api/auth/login">Login</Button>
                </div>
                
                <hr />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">Register</h5>
                <form onSubmit={formik.handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email."
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                <Input
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />

                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password."
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                
                <Button type="submit">Register</Button>
            </form>
            </Card>
        </div>
    )
}
