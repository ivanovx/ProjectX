import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as MuiLink  } from "@mui/material";

const NavLink = React.forwardRef((props: any, ref: any) => {
    const currentPath = usePathname();
    
    return (
        <MuiLink 
            {...props}
            ref={ref}
            component={Link}
            variant="button" 
            color="text.primary"
            sx={{ my: 1, mx: 1.5 }}
            underline={currentPath === props.href ? "always": "none"}
        />
    );
});

export default NavLink;