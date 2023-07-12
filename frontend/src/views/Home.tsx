import React from "react";
import { Box } from "@mui/material";
import { Circle, Pane } from "react-leaflet";

import Map  from "../components/Map";
import Search from "../components/Search";
import DeviceService from "../modules/device-service";

export default function Home() {
    const [devices, setDevices] = React.useState([]);

    const [device, setDevice] = React.useState(null);

    React.useEffect(() => {
        DeviceService
            .getAllDevices()
            .then((devices: any[]) => setDevices(devices))
            .catch(err => console.log(err));
    }, []);

    const onSelectCircle = (e) => {
        const deviceId = e.sourceTarget.options.attribution;

        alert(deviceId);
    }
    
    return  (
        <>
            <Search />
            <Box sx={{ display: 'flex', marginX: 'auto', maxWidth: '90%', }}>
                <Map>
                    <Pane name='default'>
                        {devices.map(device => {
                            let center = {
                                lat: device.coordinates.latitude, 
                                lng: device.coordinates.longitude
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
            </Box>
        </>
    );
}

/*

 <Box>
                <Typography variant="h3">ProjectX is a global sensor network that creates Open Enviromental Data.</Typography>
                <Typography variant="h4">Our idea is to inspire open source projects...</Typography>
                <a href="https://github.com/projectx">Explore project on GitHub</a>
            </Box>

 */

  

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