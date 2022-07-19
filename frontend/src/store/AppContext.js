import React, {useEffect, useState, useContext} from "react";
import {getAllFavoritesById, getAllRecipes} from "../services/apiCalls";
import AuthContext from "./AuthContext";

const AppContext = React.createContext({
        recipes: {},
        favorites: {},
        open: false,
        msg: ''
    }
);

export const AppContextProvider = (props) => {
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const userId = isLoggedIn ? authCtx.userData.data._id : undefined;

    useEffect(() => {
        if (isLoggedIn){
            getAllRecipes()
                .then((res) => {
                    res.json().then((r) => {
                        setRecipes(r.data);
                    })
                })
                .catch();

            getAllFavoritesById(userId).then((res) => {
                res.json().then((r) => {
                    setFavorites(r.data);
                })});
        }
    },[isLoggedIn, userId]);

    return (
        <AppContext.Provider value={{
            recipes: recipes,
            setRecipes: setRecipes,
            favorites: favorites,
            setFavorites: setFavorites,
            open: open,
            setOpen : setOpen,
            msg: msg,
            setMsg: setMsg
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;