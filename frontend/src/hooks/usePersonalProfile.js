import {useContext,} from "react";
import AuthContext from "../store/AuthContext";

const usePersonalProfile = (id) => {

    const authCtx = useContext(AuthContext);
    return  id === authCtx.userData.data._id;
};

export default usePersonalProfile;