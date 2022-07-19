import { useContext} from "react";
import {getAllFavoritesById} from "../services/apiCalls";
import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";

const useFetchFavorites = () => {
    const ctx = useContext(AppContext);
    const authCtx = useContext(AuthContext);

    const handleData = (data) => {
        ctx.setFavorites(data);
    }

    const fetchFavorites = () => {
        getAllFavoritesById(authCtx.userData.data._id)
            .then((res) => {
                res.json().then((r) => {
                    handleData(r.data);
                })
            })

            .catch();
    }
    return {fetchFavorites};
};

export default useFetchFavorites;