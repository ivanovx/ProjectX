import { MenuItem, TextField, TextFieldProps } from "@mui/material";

export const TextInput = (props: TextFieldProps) => 
    <TextField fullWidth sx={{ marginY: "1rem" }} variant="outlined" {...props} />

export const SelectInput = ({ items, ...props }: any) => 
    <TextField select fullWidth sx={{ marginY: "1rem" }} variant="outlined" {...props}>
        {items.map((item: any) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
    </TextField>;