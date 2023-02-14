import React, { useEffect } from "react";
import "./singupPage.css";
import Timer from "../components/timer.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../components/player.js";
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://127.0.0.1:5000");

//const socket = io("http://127.0.0.1:5000");

const MainPage = () => {
    const [players, setPlayers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(new Date().setSeconds(6000));
    const [currMoney, setCurrMoney] = useState(0);
    const [money, setMoney] = useState(0);
    const [showSold, setShowSold] = useState(false);
    const [showUnsold, setShowUnsold] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [showRunning, setShowRunning] = useState(false);
    const [change, setChange] = useState(false);
    const [showMenu,setShowMenu] = useState(true);
    //time.setSeconds(time.getSeconds() + 60);

    const handleFilterBtn = ()=>{
        setShowMenu(!showMenu);
    }

    const navigate = useNavigate();
    const handleShowRunning = async () => {
        let { data } = await axios.get("/mainpage/Running");
        setPlayers(data);
        setShowRunning(true);
        setShowAll(false);
        setShowSold(false);
        setShowUnsold(false);
    };
    const handleShowSold = async () => {
        let { data } = await axios.get("/mainpage/Sold");
        setPlayers(data);
        setShowRunning(false);
        setShowAll(false);
        setShowSold(true);
        setShowUnsold(false);
    };
    const handleShowUnsold = async () => {
        let { data } = await axios.get("/mainpage/Unsold");
        setPlayers(data);
        setShowRunning(false);
        setShowAll(false);
        setShowSold(false);
        setShowUnsold(true);
    };
    const handleShowAll = async () => {
        let { data } = await axios.get("/mainpage/All");
        setPlayers(data);
        setShowRunning(false);
        setShowAll(true);
        setShowSold(false);
        setShowUnsold(false);
    };

    useEffect(()=>{
        handleShowAll();
    },[]);

    useEffect(() => {
        if (!localStorage.getItem("userInfo")) {
            console.log(" inside if ..");
            navigate("/login");
        }
        const info = JSON.parse(localStorage.getItem("userInfo"));

        setUserId(info.id);
       // handleShowAll();
        const userMoney = async () => {
            // console.log(userId);
            let { data } = await axios.get("/user/" + userId);
            //console.log(data);
            setCurrMoney(data.currentMoney);
            setMoney(data.money);
        };

        userMoney();

        socket.emit("curr_time", { time });
        socket.on("change_curr_time", (data) => {
            if (isRunning) setTime(data.time);
            else setTime(0);
        });

        socket.on("timeout", (data) => {
            console.log("This is timeout");
            setMoney(currMoney);
        });
        socket.on("change_money", (data) => {
            //console.log("data is ", data);
            if (data.id === userId) {
                console.log("price to be set", data.price);
                setCurrMoney(data.price);
            } else if (data.id === userName) {
                //setCurrMoney(currMoney + data.price);
                userMoney();
                //setCurrMoney(data.price);
            }
        });
        //setChange(!change);
        //players();
        setUserName(info.teamName);
    }, [navigate, isRunning, time, userId, userName, currMoney]);

    useEffect(() => {
        console.log("inside useEffect");
        if (showSold) {
            handleShowSold();
        } else if (showUnsold) {
            handleShowUnsold();
        } else if (showRunning) {
            handleShowRunning();
        }
    }, [change]);

    // const time = new Date();

    return (
        <div className="main">
            <div className="heading blur ">
                <div className="currMoney ">
                    <div className="user-name">
                        Team: <span className="orange">{userName}</span>{" "}
                    </div>
                    <div className="user-money">
                        <span className="orange">Current </span>Balance:{" "}
                        {currMoney} lacs
                    </div>
                </div>
                <div className="title mp-heading">
                    <span className="orange">Auction</span> Home
                </div>

                <div
                    className="button mp-button"
                    onClick={() => {
                        localStorage.removeItem("userInfo");
                        navigate("/");
                    }}
                >
                    logout
                </div>
            </div>
            {/* <div
                className="playersBought"
                onClick={() => {
                    navigate("/playersBought");
                }}
            >
                My Players
            </div> */}
            {/* <div className="currMoney ">
                <div className="user-name">
                    Team: <span className="orange">{userName}</span>{" "}
                </div>
                <div className="user-money">
                    <span className="orange">Current </span>Balance: {currMoney}{" "}
                    lacs
                </div>
            </div> */}
            <button className="filter-btn"
            onClick={handleFilterBtn}
            >filter</button>
            <div className={showMenu?"filter":"none"}>
                <button
                    className={showRunning ? "show-btn-selected" : "show-btn"}
                    onClick={handleShowRunning}
                >
                    Running Auctions
                </button>
                <button
                    className={showSold ? "show-btn-selected" : "show-btn"}
                    onClick={handleShowSold}
                >
                    Sold Players
                </button>
                <button
                    className={showUnsold ? "show-btn-selected" : "show-btn"}
                    onClick={handleShowUnsold}
                >
                    Unsold Players
                </button>
                <button
                    className={showAll ? "show-btn-selected" : "show-btn"}
                    onClick={handleShowAll}
                >
                    Show All Players
                </button>
            </div>

            <div className="players">
                {players.length > 0 &&
                    players.map((player) => {
                        return (
                            <Player
                                key={player._id}
                                name={player.name}
                                inprice={player.current_price}
                                id={player._id}
                                userId={userId}
                                userName={userName}
                                curr_owner={player.curr_owner}
                                timeLeft={player.expires_on}
                                isRunning={player.is_auc_running}
                                setChange={setChange}
                                change={change}
                            ></Player>
                        );
                    })}
                {players?.length == 0 && (
                    <p className="no-players">No players to display</p>
                )}
            </div>
        </div>
    );
};

export default MainPage;
