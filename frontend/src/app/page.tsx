import Home from "@/modules/views/Home";
import { DEVICES } from "@/modules/mock/devices";

export default function Index() {
    return <Home devices={DEVICES} />;
}