import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

const MyTimer = ({ expiryTimestamp, id, owner, price, isSold }) => {
    const {
        seconds,
        minutes,

        isRunning,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            socket.emit("exp", { id, owner, price, isSold });
            //socket.emit("reduce_money", {userId,price});
        },
    });

    return (
        <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.6rem", color: "whitesmoke" }}>
                {isRunning && (
                    <div>
                        <span className="orange">Time</span> left :{" "}
                        <span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                )}
                {!isRunning && <span>timout</span>}
            </div>
        </div>
    );
};
export default MyTimer;
