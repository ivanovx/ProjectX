import React from "react";
import { Container } from "@mui/material";

import { getSession, getAccessToken } from "@/modules/auth/auth";

export default async function Page() {
    const session = await getSession();
    const token = await getAccessToken();

   return (
        <Container>
            {JSON.stringify(session)}
        </Container>
   );
};