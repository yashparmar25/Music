import {Icon} from '@iconify/react'; 
// x
import { useState } from "react";
import { useCookies } from "react-cookie";
import logo from "../files/logo4.jpg";
// import photo2 from "../files/logo3.png";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { Link,useNavigate} from "react-router-dom";
const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cookie,setCookie]=useCookies(["token"]);
    const navigate = useNavigate();
    const signUp= async ()=>{
        if(email !== confirmEmail)
        {
            alert("Email and confirm Email does not match...");
            return;
        }
          const data={email,password,userName,firstName,lastName};
          const response=await makeUnauthenticatedPOSTRequest("/auth/register",data);
          if(response && !response.err)
          {
            const token=response.token;
            const date=new Date();
            date.setDate(date.getDate()+30);
            setCookie("token",token,{path:"/",expires:date});
          
            alert("Success");
            navigate('/');  
          }
          else
          {
            alert("Failure");
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
        
        <div className="inputRegion w-1/3  py-10 flex flex-col  items-center justify-center">
            <div className="font-bold mb-4 text-2xl ">Sign Up for free to Start Listening.</div>
            <TextInput label="Email Address"
                placeholder="Enter Address"
                className="my-6 w-20"
                value={email}
                setValue={setEmail}
            />
 <TextInput label="Confirm Email Address"
                placeholder="Confirm Email Address"
                className="mb-6"
                value={confirmEmail}
                setValue={setConfirmEmail}
            />
            <TextInput label="Username"
                placeholder="Enter Username"
                className="mb-6"
                value={userName}
                setValue={setUsername}
            />
            <PasswordInput label="Create Password"
                placeholder="Enter Strong Password"
                value={password}
                setValue={setPassword}
            />
            <div className="w-full flex justify-between items-center space-x-8">
                <TextInput label="First Name"
                    placeholder="First Name "
                    className="my-6"
                    value={firstName}
                    setValue={setFirstName}
                />
                <TextInput label="Last Name"
                    placeholder="Last Name "
                    className="my-6"
                    value={lastName}
                    setValue={setLastName}
                />
            </div>
            <div className="w-full flex items-center justify-center my-8 ">
                <button className="bg-blue-400   font-bold p-4 px-6 rounded-full"
                  onClick={(e)=>{
                    e.preventDefault();
                    signUp();
                  }}> SIGN UP</button>
            </div>
            <div className="w-full border border-solid border-gray-400"></div>
            <div className="my-6 font-semibold text-xl">Already have an Account?</div>
            <div className="border border-gray-500 w-full rounded-full flex items-center justify-center py-3  font-bold
                             text-gray-500">
                <Link to="/login">Log In</Link>
            </div>
        </div>
    </div>
}

export default SignupComponent;