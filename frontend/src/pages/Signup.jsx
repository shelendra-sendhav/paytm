import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning"
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { API_BASE_URL } from "../config";

export const Signup = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 ">
                    <Heading label="Sign Up" />
                    <SubHeading label="Enter your information to create an account."/>
                    <InputBox label="First Name" placeholder="John" onChange={(e) =>{
                        setfirstName(e.target.value)
                    }}/>
                    <InputBox label="Last Name" placeholder="Doe" onChange={(e) => {
                        setlastName(e.target.value)
                    }} />
                    <InputBox label="Email" placeholder="john@zohomail.com" onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <InputBox label="Password" placeholder="******" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <Button label={"Sign Up"} onClick={async ()=>{
                        const response = await axios.post(`${API_BASE_URL}/user/signup`,{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")
                    }}/>
                    <ButtonWarning label={"Already have an account? "} buttonText={"Sign In"} to={"/signin"} />
                </div>
            </div>
            
        </div>
    )
}