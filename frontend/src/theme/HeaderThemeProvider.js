import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#fe4600',
        },
        info: {
            main: '#000000',
        }
    },
    typography: {
        fontFamily: 'Lato',
        h1: {
            fontFamily: 'Oswald',
        },
        h2: {
            fontFamily: 'Oswald',
        },
        h3: {
            fontFamily: 'Oswald',
        },
        h4: {
            fontFamily: 'Oswald',
        },
        h5: {
            fontFamily: 'Oswald',
        },
        h6: {
            fontFamily: 'Montserrat',
        },
        fontSize: 16,
    },
});

const HeaderThemeProvider = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default HeaderThemeProvider;