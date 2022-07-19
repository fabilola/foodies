import {useEffect, useState} from "react";
import { getUserDataById } from "../services/apiCalls";

const useFetchUserDataById = (id) => {
    const [userData, setUserData] = useState('');

    useEffect(() => {
        getUserDataById(id)
            .then((res) => res.json())
            .then((data) => {
                setUserData(data.data)});
    }, [id]);

    return [userData];
};

export default useFetchUserDataById;