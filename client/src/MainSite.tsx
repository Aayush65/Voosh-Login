import { useContext, useEffect } from "react";
import { context } from "./context";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "./utils";
import { HomePage } from "./pages";


const MainSite = () => {
    const { name, setName } = useContext(context);

    useEffect(() => {
        if (name)
            return;
        async function fetchToken() {
            const values = await getAccessToken();
            console.log(values);
            if (values && values.name){
                setName(values.name);
            }
        }
        fetchToken();
    }, []);

    
    return localStorage.getItem("accessToken") ? (
        <HomePage />
    ) : <Navigate to='/login' />
}

export default MainSite