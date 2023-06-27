import React from "react";
import { Container, Card, CardContent, Chip, Stack, Typography, Box } from "@mui/material";

import Map, { LocalMap } from "../components/Map";

export default function Home() {
    return  (
        <Box sx={{ display: 'flex', maxHeight: '750px' }}>
            <Map>
                <LocalMap />
            </Map>
        </Box>
    );
}

/*
import DeviceService from "../modules/device-service";
import useUser from "../hooks/useUser";

import Map, { LocalMap } from "../components/Map";
import { Circle, Pane } from "react-leaflet";

export default function Home() {
    const [devices, setDevices] = React.useState([]);

    React.useEffect(() => {
        DeviceService
            .getAllDevices()
            .then((devices: any[]) => setDevices(devices))
            .catch(err => console.log(err));
    }, []);

    /*const { user } = useUser();
    const [devices, setDevices] = React.useState([]);

    React.useEffect(() => {
        DeviceService
            .getAllDevices()
            .then((devices: any[]) => setDevices(devices))
            .catch(err => console.log(err));
    }, []);*/

    /*return (
        <>
            <h1>Welcome {user.username}</h1>
            <Stack spacing={2}>
                {devices.map(device => (
                    <Card variant="outlined" key={device.id}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{device.name}</Typography>
                            <Chip label={device.user} />
                            <div>{JSON.stringify(device.coordinates)}</div>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </>
    );*/
/*
    const containerSx = {
        display: "flex",
    };

    const onSelectCircle = (e) => {
        console.log(e.sourceTarget.options.attribution);
    }

    // https://mui.com/material-ui/react-dialog/

    return (
        <Container sx={containerSx}>
            <Map>
                <Pane name='default'>
                    {devices.map(device => {
                        let center = {
                            lat: device.coordinates.x, 
                            lng: device.coordinates.y
                        };

                        return (
                            <Circle
                                key={device.id}
                                attribution={device.id}
                                center={center} 
                                radius={50} 
                                pathOptions={{ color: 'blue' }} 
                                eventHandlers={{
                                    click: onSelectCircle
                                }}
                            />
                        );
                    })}
                </Pane>
            </Map>
        </Container>
    );
}*/