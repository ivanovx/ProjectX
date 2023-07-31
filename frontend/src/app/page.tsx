import DeviceService from "@/modules/services/device-service";
import Home from "@/modules/views/Home";


export default async function Index() {
   

    const devices: any= await getDevices();

    return (
       <Home devices={devices} />        
    );
}

const getDevices = async () => {
    const devices = await DeviceService.getAllDevices();

    return devices;
};
