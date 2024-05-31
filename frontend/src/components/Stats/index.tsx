"use client";

import { getAllDevicesInArea } from "@/modules/services/device-service";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DevicesListInArea() {
    const [devices, setDevices] = React.useState<any[] | null>(null);
    const searchParams = useSearchParams();
 
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    React.useEffect(() => {
        getAllDevicesInArea(lat!, lon!).then(devices => setDevices(devices)).catch(err => console.log(err));
    }, []);

    return (
        <ul>
            {devices?.map(device => <li key={device.id}>{device.id}</li>)}
        </ul>
    )
}