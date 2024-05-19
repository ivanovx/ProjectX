import React from "react";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/authOptions";
import { getUserDevices } from "@/modules/device.service";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const devices = await getUserDevices(session.token.access_token);

   return <Typography>{devices.length}</Typography>
};