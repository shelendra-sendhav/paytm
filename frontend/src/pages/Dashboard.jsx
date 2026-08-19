import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

import { API_BASE_URL } from "../config";

export const Dashboard = () =>{
    const [balance, setBalance] = useState();
    const [userId, setUserId] = useState();
    const token = localStorage.getItem("token");
    useEffect(()=>{
        const getBalance = async() =>{
            const response = await axios.get(`${API_BASE_URL}/account/balance`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }}
            );

            setBalance(Math.floor((response.data.balance)*100)/100);
            setUserId(response.data.userId);
        }
        getBalance()
    },[]);
    return(
        <div>
            <AppBar/>
            <div className="m-8">
                <Balance value={balance}/>
                <Users userId={userId}/>
            </div>
        </div>
    )
}