import dynamic from 'next/dynamic';

import { getAllDevices } from '@/modules/device.service';

export default function Home({ devices }: { devices: any[] }) {
    const Map = dynamic(() => import('@/components/Map').then(m => m), { ssr: false });

    return <Map devices={devices} />;
}

export async function getServerSideProps() {
    const devices = await getAllDevices();

    return { 
        props: {
            devices
        } 
    };
}