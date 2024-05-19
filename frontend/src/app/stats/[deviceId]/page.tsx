export default function Page({ params }: { params: { deviceId: string } }) {
    return <div>Device {params.deviceId}</div>
}