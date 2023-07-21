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

    /* const onTextTyping = async (e) => {
         const { value } = e.target;
 
         const results = await provider.search({ query: value });
 
         console.log(results);
 
         setOptions(results);
     };*/

    /* return (
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
     );*/

    const onSearch = React.useCallback(async () => {
        const results = await provider.search({ query: value });

        console.log(results);

        setOptions(results);
    }, [value]);

    return (
        <div className="my-2">
            
        <div className="flex my-2">
            <TextInput className="flex-1 mx-2" type="text" placeholder="Search address" onChange={e => setValue(e.target.value)} />
            <Button className="flex-none" onClick={onSearch}>Seach</Button>
        </div>
        
        <Select required className="mx-2" onSelect={e => console.log(e)}>
            {options?.map(option => <option>{option.label}</option>)}
        </Select>
        </div>

    );
}