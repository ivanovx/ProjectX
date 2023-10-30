import HttpService from "./http-service";

import { API_URL, CREATE_DEVICE_URL, HOME_URL, USER_DEVICES_URL } from "../apiConfig";

export default class DeviceService {
    static getAllDevices() {
        return HttpService.doGet(HOME_URL);
    }

    static getUserDevices(token: string) {
        return HttpService.doGet("http://localhost:8000/devices", {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }

    static createDevice(deviceData: any, userId: string, token: string) {
        return HttpService.doPost("http://localhost:8000/devices?userId" + userId, deviceData/*, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        }*/);
    }

    static activateDevice(deviceId: string, token: string) {
        return HttpService.doPost(`${USER_DEVICES_URL}/activate/${deviceId}`, null, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }
}