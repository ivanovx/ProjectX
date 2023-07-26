import { Checkbox, Label, Select, TextInput } from "flowbite-react";
import React from "react";

export const Check = React.forwardRef(function CheckboxField({ label, value, ...props }: any, ref: any) {
    const id = React.useId();

    return (
        <>
            <Checkbox {...props} checked={value} id={id} ref={ref} />
            <Label htmlFor={id}>{label}</Label>
        </>
    );
});

export const Input = React.forwardRef(function InputField({ label, value, ...props }: any, ref: any) {
    const id = React.useId();

    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={id}
                    value={label}
                    {...props}
                />
            </div>
            <TextInput
                id={id}
                type="text"
                value={value}
                {...props}
                ref={ref}
            />
        </>
    );
});

export const SelectList = React.forwardRef(({ label, values, ...props }: any, ref: any) => {
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
                {values.map(value => <option value={value}>{value}</option>)}
            </Select>
        </>
    );
});