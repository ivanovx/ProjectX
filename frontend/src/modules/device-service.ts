import axios from "axios";

export async function getAllDevices() {
    const homeReq = await axios.get(`http://localhost:8080/home`);
    const homeData = await homeReq.data;

    return homeData;
}

