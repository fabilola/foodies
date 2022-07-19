import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {AuthContextProvider} from "./store/AuthContext";
import FoodiesThemeProvider from "./theme/FoodiesThemeProvider";
import {AppContextProvider} from "./store/AppContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <FoodiesThemeProvider>
                    <AppContextProvider>
                        <App/>
                    </AppContextProvider>
                </FoodiesThemeProvider>
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>
);
