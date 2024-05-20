import { httpService, secureHttpService } from './http-service';

type Device = {
    [key: string]: any;
}

export const getAllDevices = async () => {
    const res = await httpService.get<Device[]>("/devices/all");

    return res.data;
}

export const getUserDevices = async (accessToken: string) => {
    const res = await secureHttpService(accessToken).get<Device[]>("/devices/user");

    return res.data;
}

export const getDeviceStats = async (deviceId: string) => {
    const res = await httpService.get<Device>(`/devices/${deviceId}`);

    return res.data;
}

export const createDevice = async (deviceData: Device, accessToken: string) => {
    const res = await secureHttpService(accessToken).post<Device>("/devices/create", deviceData);

    return res.data;
}