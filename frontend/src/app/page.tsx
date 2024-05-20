import dynamic from "next/dynamic";
import { getAllDevices } from "@/modules/services/device-service";

const Map = dynamic(() => import('@/components/Map').then(m => m), { ssr: false });

export default async function Page() {
    const devices = await getAllDevices();

    return <Map devices={devices} />
}
