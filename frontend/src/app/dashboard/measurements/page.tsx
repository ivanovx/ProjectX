import { Container, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getAccessToken } from "@/modules/auth/auth";
import { getUserDevices } from "@/modules/services/device-service";


/*
https://mui.com/x/react-data-grid/getting-started/#installation

*/

export default async function Page() {
    const accessToken = await getAccessToken();
    const devices = await getUserDevices(accessToken);

    const getDeviceMeasurements = async (deviceId: string) => {

    };

    return (
        <Container>
            {devices.map(device => (
                <Accordion key={device.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {device.name}
                    </AccordionSummary>
                    <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            ))}

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Accordion 2
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}