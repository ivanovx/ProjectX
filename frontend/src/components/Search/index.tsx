"use client";

import React from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { TextInput, Button, Select } from "flowbite-react";

type SearchProps = {
    onSelectValue: (e: any) => void;
}

/*
https://github.com/smeijer/leaflet-geosearch
https://stackoverflow.com/questions/48290555/react-leaflet-search-box-implementation
 */
export default function Search({ onSelectValue }: SearchProps) {
    const [value, setValue] = React.useState<string | null>(null);
    const [options, setOptions] = React.useState<any[] | null>([]);

    const provider = new OpenStreetMapProvider();

    const onSearch = React.useCallback(async () => {
        const results = await provider.search({ query: value });

        setOptions(results);
    }, [value]);

    const onSelect = (e: any) => {
        const value = JSON.parse(e.target.value);

        onSelectValue(value);
    };

    return (
        <div className="my-2">
            <div className="flex my-2">
                <TextInput className="flex-1 mx-2" type="text" placeholder="Search address" onChange={e => setValue(e.target.value)} />
                <Button className="flex-none" onClick={onSearch}>Search</Button>
            </div>
            <Select className="mx-2" onChange={onSelect}>
                <option>Please select location</option>
                {options?.map(option => <option key={option.label} value={JSON.stringify(option)}>{option.label}</option>)}
            </Select>
        </div>
    );
}