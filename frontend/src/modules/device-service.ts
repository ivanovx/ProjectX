import HttpService from "./http-service";

import { API_URL, HOME_URL, USER_DEVICES_URL } from "./apiConfig";

export default class DeviceService {
    static getAllDevices() {
        return HttpService.doGet(HOME_URL);
    }

    static getUserDevices(token: string) {
        return HttpService.doGet(USER_DEVICES_URL, {
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

    static activateDevice(deviceId: string, token: string) {
        return HttpService.doPost(`${API_URL}/devices/activate/${deviceId}`, null, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }

    static createToken(deviceId: string, token: string) {
        return HttpService.doPost(`${API_URL}/token/create/${deviceId}`, null, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }
}