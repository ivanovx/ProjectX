import dynamic from 'next/dynamic';

export default function Home() {
    const Map = dynamic(() => import('@/components/Map').then(m => m), { ssr: false })

    return (
        <div>
            <Map />
        </div>
    );
}