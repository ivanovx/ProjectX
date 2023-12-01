import { getAllDevices } from '@/modules/device.service';
import dynamic from 'next/dynamic';

export default function Home({ devices }) {
    const Map = dynamic(() => import('@/components/Map').then(m => m), { ssr: false });

    return (
        <div>
            <Map />
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