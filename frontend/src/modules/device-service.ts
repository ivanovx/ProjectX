import HttpService from "./http-service";

import { API_URL, HOME_URL } from "./apiConfig";

export default class DeviceService {
    static getAllDevices() {
        return HttpService.doGet(HOME_URL);
    }

    static createDevice(deviceData: any, token: any) {
        return HttpService.doPost(`${API_URL}/devices/create`, deviceData, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }
}