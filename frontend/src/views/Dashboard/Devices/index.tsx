import React from "react";
import DeviceService from "../../../modules/device-service";
import { useAuth } from "../../../components/Auth";

export default function Devices() {
    const auth = useAuth();
    const [devices, setDevices] = React.useState<any[]>(null);
    
    React.useEffect(() => {
        DeviceService.getUserDevices(auth.token.accessToken).then(console.log).catch(console.log)
    }, []);

    return (
        <ul>
            
            <li>d</li>
        </ul>
    );
}