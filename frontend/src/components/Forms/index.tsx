import { Checkbox, Label, Select, TextInput } from "flowbite-react";
import React from "react";

export const Check = ({ label, value, ...props }: any) => {
    const id = React.useId();

    return (
        <>
            <Checkbox {...props} checked={value} id={id} />
            <Label htmlFor={id}>{label}</Label>
        </>
    );
}

export const Input = ({ label, value, ...props }: any) => {
    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={label}
                    value={label}
                />
            </div>
            <TextInput
                id={label}
                type="text"
                value={value}
                {...props}
            />
        </>
    );
}

export const SelectList = ({ label, values, ...props }: any) => {
    const id = React.useId();

    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={id}
                    value={label}
                />
            </div>
            <Select id={id} {...props}>
                <option>Please select option</option>
                {values.map(value => <option key={value} value={value}>{value}</option>)}
            </Select>
        </>
    );
}