import React from "react";
import {Autocomplete, TextField} from "@mui/material";
import {OpenStreetMapProvider} from "leaflet-geosearch";

/*
https://github.com/smeijer/leaflet-geosearch
https://stackoverflow.com/questions/48290555/react-leaflet-search-box-implementation
 */
export default function Search({ onSelectValue, ...props }) {
    const [options, setOptions] = React.useState<any[] | null>([]);

    const provider = new OpenStreetMapProvider();

    const onTextTyping = async (e) => {
        const { value } = e.target;

        const results = await provider.search({ query: value });

        console.log(results);

        setOptions(results);
    };

    return (
        <Autocomplete
            {...props}
            freeSolo
            disableClearable
            options={options}
            onChange={onSelectValue}
            renderInput={params => <TextField {...params}  InputProps={{
                ...params.InputProps,
                type: 'search',
            }} onChange={onTextTyping} label="Search" />}
        />
    );
}