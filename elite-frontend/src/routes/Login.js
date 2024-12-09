import { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../files/logo4.jpg";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import {makeUnauthenticatedPOSTRequest} from  '../utils/serverHelpers';
import {useCookies} from  'react-cookie';

// import { use } from "../../../spotift-backend/routes/auth";


const LoginComponent = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const [cookie,setCookie] = useCookies("");
    const navigate = useNavigate("");

    const login= async ()=>{
        
          const data={email,password};
          const response=await makeUnauthenticatedPOSTRequest("/auth/login",data);
          if(response && !response.err)
          {
            const token=response.token;
            const date=new Date();
            date.setDate(date.getDate()+30);
            setCookie("token",token,{path:"/",expires:date});
          
            alert("Successfully Log in Click Ok");
            navigate('/');  
          }
          else
          {
            alert("Oops Your Password is Wrong!!! Please, Enter Correct Password");
          }
    };



    return <div className="w-full h-full flex flex-col items-center">
        <div className="logo p-6 border-b border-solid border-gray-300 w-full flex justify-center">
        <img
                                src={logo}
                                alt="spotify logo"
                                width={150}
                            />
        </div>
        <div className="inputRegion w-1/3 py-10  justify-center">
            <div className="font-bold flex-col flex items-center mb-4">To continue, log in to  Elite</div>
            <TextInput
                label="Email address or username"
                placeholder="Email address or username"
                className="my-6"
                value={email}
                setValue={setEmail}
                />

            <PasswordInput
                label="Password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
                />
            <div className="w-full flex items-center justify-end my-8">
                <button className="bg-green-400 text-lg font-semibold p-3 px-10 rounded-full items-center justify-center"
                onClick={(e)=>{
                    e.preventDefault();
                    login();
                }}
                >Log In</button>
            </div>
            <div className="w-full border-b border-solid border-gray-300"></div>
            <div className="my-6 font-semibold text-lg text-center">Don't have an account?</div>
            <div className="border border-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold text-gray-400">
                <Link to="/signup">
                SIGN UP FOR ELITE
                </Link>
            </div>
        </div>
    </div>
};
export default LoginComponent;




