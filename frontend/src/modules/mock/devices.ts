import { Device } from "@/types";

export const DEVICES: Device[] = [
    {
        name: "test",
        controller: "Arduino",
        sensors: ["BME280", "BME680"],
        user: "CSYNTAX",
        coordinates: {
            latitude: 42.698334,
            longitude: 23.319941
        },
        activated: new Date(),
        created: new Date(),
        modified: new Date(),
        outdoor: false
    },
    {
        name: "test-2",
        controller: "Arduino",
        sensors: ["BME280", "BME680"],
        user: "CSYNTAX",
        coordinates: {
            latitude: 42.698354,
            longitude: 23.319945
        },
        activated: new Date(),
        created: new Date(),
        modified: new Date(),
        outdoor: false
    }
];