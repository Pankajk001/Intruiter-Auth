import React, { use, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

    const sendVerificationOtp = async () => {
        try{
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');

            if(data.success){
                navigate('/email-verify');
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        }

        catch(error){
            toast.error(error.message);
        }
    }

    const logout = async () => {
        try{
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/auth/logout');
            data.success && setIsLoggedin(false);
            data.success && setUserData(null);
            data.success && toast.success(data.message);
            navigate('/');
        }

        catch(error){
            toast.error(error.message);
        }
    }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-15 absolute top-0 bg-[#00003C]">
      <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />

      {userData ? (
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 text-black font-bold relative group cursor-pointer">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-lg pt-10">
                <ul className="list-none m-0 p-2 bg-gray-200 text-sm font-semibold rounded-md">
                    {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-300 hover:shadow-lg">Verify Email</li> }
                    
                    <li onClick={logout} className="py-1 px-2 hover:bg-gray-300 hover:shadow-lg pr-10">Logout</li>
                </ul>
            </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-100 rounded-full px-6 py-2 text-gray-300 hover:bg-gray-200 hover:cursor-pointer font-semibold hover:text-gray-900 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
