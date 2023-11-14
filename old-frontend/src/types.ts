export type Coordinates = {
    latitude: number;
    longitude: number;
}

export type Device = {
    name: string;
    user: string;
    created: Date;
    modified: Date;
    activated: Date;
    outdoor: boolean;
    sensors: string[];
    controller: string;
    coordinates: Coordinates;
}