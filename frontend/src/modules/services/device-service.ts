import { httpService, secureHttpService } from './http-service';

type Device = {
    [key: string]: any;
}

export const getAllDevices = async () => {
    const res = await httpService.get<Device[]>("/devices");

    return res.data;
}

export const getUserDevices = async (accessToken: string) => {
    const res = await secureHttpService(accessToken).get<Device[]>("/devices");

    return res.data;
}

export const getDevice = async (deviceId: string) => {
    const res = await httpService.get<Device>(`/devices/${deviceId}`);

    return res.data;
}

export const createDevice = async (accessToken: string, deviceData: Device) => {
    const res = await secureHttpService(accessToken).post<Device>("/devices", deviceData);

    return res.data;
}

export const updateDevice = async (accessToken: string, deviceId: string, deviceData: Device) => {
    const res = await secureHttpService(accessToken).put<Device>(`/devices/${deviceId}`, deviceData);

    return res.data;
}

export const deleteDevice = async (accessToken: string, deviceId: string) => {
    const res = await secureHttpService(accessToken).delete<Device>(`/devices/${deviceId}`);

    return res.data;
}