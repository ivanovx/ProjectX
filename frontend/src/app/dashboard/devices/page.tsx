"use client";

import Map from "@/components/Map";
import Search from "@/components/Search";

export default function Home() {
    const onSelectValue = (value: any) => {
        console.log(value);
    };

    return (
        <>
            <Search onSelectValue={onSelectValue} />
            <Map />
        </>
        
    );
}
