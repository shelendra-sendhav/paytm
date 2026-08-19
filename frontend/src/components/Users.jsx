import { useEffect, useState } from "react"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_BASE_URL } from "../config";

export const Users = ({userId}) =>{
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${API_BASE_URL}/user/bulk?filter=` + filter,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
                .then(response => {
                    setUsers(response.data.user)
                });
    }, [filter]);
    return<>
        <div className="font-bold text-lg mt-6">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) =>{
                setFilter(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div>
            {users.map(user => user._id !== userId? <User user={user} key={users.indexOf(user)}/>:null)}
        </div>
    </>
}

const User = ({user}) =>{
    const navigate = useNavigate();
    return<>
        <div className="flex justify-between mt-2 hover:bg-slate-50 rounded-sm p-1">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {(user.firstName && user.firstName.length > 0) ? user.firstName[0].toUpperCase() : "?"}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button onClick={() => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName)
                }} label={"Send Money"} />
            </div>
        </div>
        
    </>
}