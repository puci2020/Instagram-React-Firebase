import React from 'react';
import GlobalStyle from './GlobalStyles'
import {ThemeProvider} from 'styled-components'
import {theme} from "./Theme";

const Layout = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            {children}
        </ThemeProvider>
    );
};

export default Layout;
