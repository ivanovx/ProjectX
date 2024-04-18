import { getAllDevices } from '@/modules/device.service';

export default function Stats({ devices }) {

    return (
        <div>
            <h1>Stats</h1>
            <div>{devices}</div>
        </div>
    );
}

export async function getServerSideProps() {
    const devices = await getAllDevices();

    return { 
        props: { 
            devices
        } 
    };
}