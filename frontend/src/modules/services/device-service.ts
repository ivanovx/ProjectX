import HttpService from "./http-service";
import { API_URL } from "../apiConfig";

export default class DeviceService {
    static getAllDevices() {
        return HttpService.doGet(`${API_URL}/devices/all`);
    }

    static getUserDevices(token: string) {
        return HttpService.doGet(`${API_URL}/devices/user`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }

    static createDevice(deviceData: any, token: string) {
        return HttpService.doPost(`${API_URL}/devices/create`, deviceData, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }
}