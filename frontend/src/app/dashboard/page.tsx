import React from "react";
import { Typography } from "@mui/material";

import { getAccessToken } from "@/modules/auth/auth";
import { getUserDevices } from "@/modules/services/device-service";

export default async function Page() {
    const token = await getAccessToken();
    const devices = await getUserDevices(token);

   return <Typography>{devices.length}</Typography>
};