import React, { useEffect } from "react";
import "./singupPage.css";
import Timer from "../components/timer.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../components/adminplayer.js";
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://127.0.0.1:5000");

//const socket = io("http://127.0.0.1:5000");

const MainPage = () => {
    const [players, setPlayers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(new Date().setSeconds(60));
    const [isSold,setIsSold] = useState(false);

    //time.setSeconds(time.getSeconds() + 60);

    const navigate = useNavigate();

    const handleAddButton = ()=>{
        navigate("/addplayer");
    }

    useEffect(() => {
        if (!localStorage.getItem("userInfo")) {
            console.log(" inside if ..");
            navigate("/login");
        }
        const data = JSON.parse(localStorage.getItem("userInfo"));
        if (!data.isAdmin) {
            navigate("/mainpage");
        }
        const players = async () => {
            const { data } = await axios.get("/mainpage/All");
            setPlayers(data);
        };
        const info = JSON.parse(localStorage.getItem("userInfo"));
        setUserId(info.id);
        setUserName(info.teamName);

        socket.emit("curr_time", { time });
        socket.on("change_curr_time", (data) => {
            if (isRunning) setTime(data.time);
            else setTime(0);
        });

        socket.on("timeout", (data) => {
            setIsRunning(false);
            setIsSold(true);
        });

        players();
    }, [navigate, isRunning, time]);

    // const time = new Date();

    return (
        <div className="main admin-main">
            <div className="main-header">ADMIN PAGE!!</div>
            <div
                className="button mp-button"
                onClick={() => {
                    localStorage.removeItem("userInfo");
                    navigate("/");
                }}
            >
                logout
            </div>

            <div className="players players-admin">
                {players.map((player) => {
                    //console.log(player.name, player.time_left);
                    return (
                        <Player
                            key={player._id}
                            name={player.name}
                            inprice={player.current_price}
                            id={player._id}
                            curr_status={player.curr_status}
                        ></Player>
                    );
                })}
            </div>
                <button className="button add-btn" onClick={handleAddButton}>
                    Add player
                </button>
        </div>
    );
};

export default MainPage;
