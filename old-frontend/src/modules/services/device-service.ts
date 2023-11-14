import HttpService from "./http-service";

import { HOME_URL, USER_DEVICES_URL } from "../apiConfig";

export default class DeviceService {
    static getAllDevices() {
        return HttpService.doGet(HOME_URL);
    }

    static getUserDevices(token: string) {
        return HttpService.doGet("http://localhost:8000/devices/user", {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }

    static createDevice(deviceData: any, token: string) {
        return HttpService.doPost("http://localhost:8000/devices/create", deviceData, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }

    static activateDevice(deviceId: string, token: string) {
        return HttpService.doPost(`http://localhost:8000/devices/activate/${deviceId}`, null, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }
}