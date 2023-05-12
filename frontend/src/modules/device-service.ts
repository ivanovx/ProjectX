import HttpService from "./http-service";

import { HOME_URL } from "./apiConfig";

export default class DeviceService {
    static getAllDevices() {
        return HttpService.doGet(HOME_URL);
    }
}