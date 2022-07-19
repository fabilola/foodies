import './App.css';
import Header from "./components/Header/Header";
import BrowseRecipes from "./pages/BrowseRecipes/BrowseRecipes";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import { Route, Routes, Navigate} from "react-router-dom";
import AppContext from "./store/AppContext";
import React, {useContext} from "react";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import AuthContext from "./store/AuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {Snackbar} from "@mui/material";

function App() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const ctx = useContext(AppContext);

    const handleClose = () => {
        ctx.setOpen(false);
    };

    return (
        <div className="App">
            <div>
                <Header/>
                <div className={'app__spacing'}>
                    <Routes>
                        {
                            !isLoggedIn &&
                            <Route path='*' element={<Navigate to="/auth" />}>
                            </Route>
                        }
                        {
                            !isLoggedIn &&
                            <Route path={'/auth'} element={<LoginPage/>}>
                            </Route>
                        }
                        {
                            isLoggedIn &&   <Route path={'/profile/:id'} element={<ProfilePage/>}>
                            </Route>
                        }
                        {
                            isLoggedIn &&
                            <Route path={'/browse'} element={<BrowseRecipes isFavorite={false}/>}>
                            </Route>
                        }
                        {
                            isLoggedIn &&
                            <Route path={'/favorite'} element={<BrowseRecipes isFavorite={true}/>}>
                            </Route>
                        }
                        {
                            isLoggedIn &&  <Route path={'/create'} element={<CreateRecipe isEdit={false}/>}>
                            </Route>
                        }
                        {
                            isLoggedIn &&  <Route path={'/edit/:id'} element={<CreateRecipe isEdit={true}/>}>
                            </Route>
                        }
                        {
                            isLoggedIn && <Route path={'/detail/:id'} element={<RecipeDetail/>}>
                            </Route>
                        }
                        {
                            isLoggedIn &&   <Route path={'*'} element={<Navigate to="/browse" />}>
                            </Route>
                        }
                    </Routes>
                    <Snackbar
                        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                        open={ctx.open}
                        onClose={handleClose}
                        message={ctx.msg}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
