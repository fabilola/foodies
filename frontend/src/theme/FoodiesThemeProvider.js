import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#fe4600',
        },
        secondary: {
            main: '#757575',
        },
        love: {
            main: '#ff6d75',
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
            fontFamily: 'Oswald',
        },
        fontSize: 16,
    },
});

const FoodiesThemeProvider = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default FoodiesThemeProvider;