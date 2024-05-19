import { NextPageContext } from "next";
import { getDeviceStats } from "@/modules/device.service";

export default function DeviceStats({ device } : any) {    
    return <h1>{device.name}</h1>
}

export async function getServerSideProps(context: NextPageContext) {
    const { id } = context.query;
    const device = await getDeviceStats(id as string);

    return { 
        props: {
            device 
        } 
    };
}