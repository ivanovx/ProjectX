import { httpService } from "./http-service";

export const getDeviceStats = async (deviceId: string) => {
    const res = await httpService.get<any>(`/stats/${deviceId}`);

    return res.data;
};