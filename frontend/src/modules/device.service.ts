import { httpService } from './http.service';

type Device = {
    [key: string]: any;
}

export const getAllDevices = async () => await httpService.get("/devices/all");

export const getUserDevices = async (accessToken: string) => await httpService.get("/devices/user", {
    headers: {
        'Authorization' : `Bearer ${accessToken}`
    }
});

export const createDevice = async (deviceData: Device, accessToken: string ) => httpService.post("/devices/create", deviceData, {
    headers: {
        'Authorization' : `Bearer ${accessToken}`
    }
});