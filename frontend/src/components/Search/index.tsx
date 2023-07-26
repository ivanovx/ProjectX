import React from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { TextInput, Button, Select } from "flowbite-react";

/*
https://github.com/smeijer/leaflet-geosearch
https://stackoverflow.com/questions/48290555/react-leaflet-search-box-implementation
 */
export default function Search({ onSelectValue }: any) {
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
                {options?.map(option => <option key={option.label} value={JSON.stringify(option)}>{option.label}</option>)}
            </Select>
        </div>
    );
}