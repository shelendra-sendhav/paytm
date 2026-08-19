import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config";

export const SendMoney = () =>{
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState();
    const navigate = useNavigate();

    return <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="boder h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center ">Send Money</h2>
        </div>
        <div className="p-6">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center ">
                    <span className="text-2xl text-white">{(name && name.length > 0) ? name[0].toUpperCase() : "?"}</span>
                </div>
                <h3 className="text-2xl font-semibold">{name || "User"}</h3>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount (in Rs)</label>
                    <input type="number"
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount" 
                    />
                </div>
                    <button onClick={() => {
                        const sendMoney = async()=>{
                            await axios.post(`${API_BASE_URL}/account/transfer`, {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            });
                            navigate("/dashboard")
                        }
                        sendMoney()
                    }} className="justify-center text-sm rounded-md font-medium ring-offset-backgorund transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">Initiate Transfer</button>
            </div>
            
        </div>
        </div>
    </div>
}