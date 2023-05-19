import React from "react";
import DeviceService from "../../../modules/device-service";
import { useAuth } from "../../../components/Auth";

export default function Devices() {
    const auth = useAuth();
    const [devices, setDevices] = React.useState([]);
    
    React.useEffect(() => {
        DeviceService
            .getUserDevices(auth.token.accessToken)
            .then((devices: any[]) => {
                setDevices(devices);
                console.log(devices);
            })
            .catch(console.log)
    }, []);

    return (
        <ul>
            {devices.map(device => <li>{device.title} - {device.user.email}</li>)}
        </ul>
    );
}