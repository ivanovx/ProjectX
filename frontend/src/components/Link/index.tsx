import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

type LinkProps = {
    href: string;
    label: string;
    [key: string]: any;
};

export default function Link({ href, label, ...props }: LinkProps) {
    if (href.startsWith("http")) {
        return <MuiLink component="a" href={href} {...props} rel="noopener">{label}</MuiLink>
    }

    return <MuiLink component={RouterLink} to={href} {...props}>{label}</MuiLink>  
}