import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async () => {
        try{
            console.log(document.cookie);
            console.log("pankaj")
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
            if(data.success){
                setIsLoggedin(true);
                getUserData();
            }
        }
        catch(error){
           toast.error(error.message);
        }
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data');
            if(data.success){
                setUserData(data.userData);
            }
            else{
                toast.error(data.message);
            }
            // data.success ? setUserData(data.userData) : toast.error(data.message);
        } 
        catch (error) {

            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);
    
    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData
    }

  return( 
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

  )
};
