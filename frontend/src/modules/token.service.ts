import { secureHttpService } from "./http.service";

export const getDeviceToken = async (accessToken: string, deviceId: string) => {
    const res = await secureHttpService(accessToken).get(`/devices/${deviceId}/token`);

    return res.data;
}

export const createDeviceToken = async (accessToken: string, deviceId: string) => {
    const res = await secureHttpService(accessToken).post(`/devices/${deviceId}/token`);

    return res.data;
}