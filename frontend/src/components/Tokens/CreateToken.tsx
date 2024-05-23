"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from '@mui/material';

import { createDeviceToken } from "@/modules/services/token-service";

export default function CreateToken({ accessToken, deviceId }: { accessToken: string; deviceId: string }) {
    const router = useRouter();
   
    const onCreateToken = async (e: any) => {
        const res = await createDeviceToken(accessToken, deviceId);

        console.log(res);

        router.push('/dashboard/tokens'); 
    };

    return <Button onClick={onCreateToken}>Create</Button>;
}