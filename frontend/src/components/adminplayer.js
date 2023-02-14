import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./player.css";
import Timer from "./timer.js";
const socket = io("http://127.0.0.1:5000");

const Player = ({ name, inprice, id, curr_status }) => {
    const [price, setPrice] = useState(inprice);
    const [isSold, setIsSold] = useState(curr_status === "sold" ? true : false);

    const startAuctionHandler = () => {
         const time = new Date();
         time.setSeconds(time.getSeconds() + 600);
         console.log("time given : ",time);
         socket.emit("start_auction", { id, timeLeft: time});
    };
    useEffect(() => {
        socket.on("timeout", (data) => {
            if (data.id === id) {
                setIsSold(true);
            }
        });
    }, []);

    return (
        <div className="player-card admin-player-card pl-blur">
            <div className="name cditem">{name}</div>
            <div className="curr-price cditem">
                Current Price(lac) : <br />
                {price}
            </div>
            {/* {isSold && <div className="status cditem">{curr_status}</div>} */}
            {/* {!isSold && (
                <button  className="button" onClick={startAuctionHandler}>Start </button>
            )} */}
            {/* //remove the line */}
            <button className="button" onClick={startAuctionHandler}>Start </button>
        </div>
    );
};

export default Player;
