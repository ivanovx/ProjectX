import DeviceService from "@/modules/services/device-service";
import Stats from "@/modules/views/Stats";

export default async function StatsPage() {
    const devices: any= await getDevices();

    return <Stats devices={devices} />;
}

const getDevices = async () => {
    const devices = await DeviceService.getAllDevices();

    return devices;
};
