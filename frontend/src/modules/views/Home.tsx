"use client";

import Search from "@/components/Search";
import Map from "@/components/Map";

type Props = {
    devices: any[];
}

export default function Home({ devices }: Props) {
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