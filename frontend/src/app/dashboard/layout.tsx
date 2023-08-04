import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: any) {
    return (
        <div className="flex">
            <div className="flex-none w-96 mx-2">
                <Sidebar />
            </div>
            <div className="flex-1 grow">{children}</div>
        </div>
    );
}