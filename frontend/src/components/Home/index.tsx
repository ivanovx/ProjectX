import React from "react";

import { getAllDevices } from "../../modules/device-service";
import UserService from "../../modules/user-service";

export default function Home() {
    const [devices, setDevices] = React.useState<any[] | null>(null);

    React.useEffect(() => {
        getAllDevices().then(devices => setDevices(devices));
    }, []);

    React.useEffect(() => {
        UserService.signIn({email: "csyntax@outlook.com", password: "test"}).then(console.log)
    }, []);

    return (
        <ul>
            {devices?.map(device => <li key={device.id}>{device.title}</li>)}
        </ul>
    );
}