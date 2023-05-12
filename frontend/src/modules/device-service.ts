import HttpService from "./http-service";

import { HOME_URL } from "./apiConfig";

export default class DeviceService {
    static async getAllDevices() {
        return await HttpService.doGet(HOME_URL);
    }
}