import React from "react";
import { OpenStreetMapProvider, GoogleProvider } from "leaflet-geosearch";
import { Button, MenuItem, TextField, Stack } from "@mui/material";

import { TextInput } from "../Input";

type SearchProps = {
    onSelectValue: (e: any) => void;
}

/*
    Use Autocomplete
    https://github.com/smeijer/leaflet-geosearch
    https://stackoverflow.com/questions/48290555/react-leaflet-search-box-implementation
*/
export default function Search({ onSelectValue }: SearchProps) {
    const [value, setValue] = React.useState<string | null>(null);
    const [options, setOptions] = React.useState<any[] | null>([]);

    const provider = new OpenStreetMapProvider();

    const onSearch = async () => {
        const results = await provider.search({ query: value! });

        setOptions(results);
    };

    const onSelect = (e: any) => {
        const value = JSON.parse(e.target.value);

        onSelectValue(value);
    };

    return (
        <Stack direction="row" spacing={2} mb={5}>
            <TextInput label="Address" onChange={e => setValue(e.target.value)} />
            <Button variant="contained" onClick={onSearch}>Search</Button> 
            <TextField label="Select address" select fullWidth sx={{ marginY: "1rem" }} variant="outlined" onChange={onSelect}>
                {options?.map((option: any) => <MenuItem key={option.label} value={JSON.stringify(option)}>{option.label}</MenuItem>)}
            </TextField>
        </Stack>
    )
}