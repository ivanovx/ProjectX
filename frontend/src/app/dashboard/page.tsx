import React from "react";
import { Container } from "@mui/material";

import { getSession, getAccessToken } from "@/modules/auth/auth";
import { getUserDevices } from "@/modules/services/device-service";

export default async function Page() {
    const session = await getSession();
    const token = await getAccessToken();
    const devices = await getUserDevices(token);

   return (
        <Container>
            {JSON.stringify(session)}
        </Container>
   );
};