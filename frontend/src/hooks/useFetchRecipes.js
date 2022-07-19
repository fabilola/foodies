import { useContext} from "react";
import {getAllRecipes} from "../services/apiCalls";
import AppContext from "../store/AppContext";

const useFetchRecipes = () => {
    const ctx = useContext(AppContext);

    const handleData = (data) => {
        ctx.setRecipes(data);
    }

    const fetchRecipes = () => {
        getAllRecipes()
            .then((res) => {
                res.json().then((r) => {
                    handleData(r.data);
                })
            })
            .catch();
    }

    return {fetchRecipes};
};

export default useFetchRecipes;