"use client";

import Map from "@/components/Map";
import Search from "@/components/Search";

import type { Device } from "@/types";

type HomeProps = {
    devices: Device[];
}

export default function Home({ devices }: HomeProps) {
    const onSelectValue = (value: any) => {
        console.log(value);
    };

    return (
        <>
            <Search onSelectValue={onSelectValue} />
            <Map devices={devices} />
        </>
    );
}