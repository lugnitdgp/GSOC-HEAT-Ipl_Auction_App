import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./player.css";
import Timer from "./timer.js";
const socket = io("http://127.0.0.1:5000");

const Player = ({
    name,
    inprice,
    id,
    userId,
    userName,
    curr_owner,
    timeLeft,
    isRunning,
    setChange,
    change
}) => {
    const [price, setPrice] = useState(inprice);
    const [isSold, setIsSold] = useState(curr_owner === "none" ? false : true);
    const [owner, setOwner] = useState(curr_owner);
    const [isExpired, setIsExpired] = useState(false);
    const [renderTimer, setRenderTimer] = useState(isRunning);
    const [time, setTime] = useState(Date.parse(timeLeft));
    const [error, setError] = useState(false);

    const clickHandler = async () => {
        let { data } = await axios.get("/user/" + userId);
        //console.log("User is",data.currentMoney);
        let currMoney = data.currentMoney;
        //currMoney = 100000; //for testing
        if (userName !== owner && currMoney >= price) {
            //console.log("userData is ", user.data);
            socket.emit("bid", { price, id });
            const newPrice = price + 100;
            setPrice(newPrice);

            const { data } = await axios.put("/mainpage", {
                id,
                price: newPrice,
                userId,
                userName,
                prevUserId: curr_owner,
            });

            setIsSold(true);
            setOwner(userName);
            socket.emit("current_owner", { owner: userName, id });
            console.log("current Money", currMoney, price);
            socket.emit("change_user_money", {
                id: userId,
                price: currMoney - price,
            });
            if (curr_owner !== "none")
                socket.emit("change_prev_user_money", {
                    id: owner,
                    price: price - 100,
                });
        } else if (currMoney < price) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1000);
        }
    };
    useEffect(() => {
        socket.on("bid_inc", (data) => {
            // console.log(data);
            if (data.id === id) {
                setPrice(data.price + 100);
            }
        });

        socket.on("change_current_owner", (data) => {
            if (data.id === id) {
                setOwner(data.owner);
            }
        });

        socket.on("start_timer", (data) => {
            setChange(!change);
            if (data.id === id) {
                if (!renderTimer) {
                    setRenderTimer(true);
                    let time = data.timeLeft;

                    setTime(Date.parse(time));
                }
            }
        });

        socket.on("timeout", (data) => {
            if (data.id === id) {
                setIsExpired(true);
                setRenderTimer(false);
            }
        });
        setChange(!change)
    }, [id, renderTimer,time,owner]);

    return (
        <div className="player-card pl-blur ">
            {renderTimer && (
                <div>
                    {renderTimer && (
                        <Timer
                            expiryTimestamp={time}
                            id={id}
                            owner={owner}
                            price={price}
                            isSold={isSold}
                            className="timer"
                        />
                    )}
                    <div className="name run-name cditem">{name}</div>

                    <div className="curr-price cditem">
                        Current bid: <div className="price">{owner}</div>{" "}
                    </div>
                    <div className="curr-price cditem">
                        Current Price :
                        <br />
                        <div className="price">
                            <span className="orange">{price}</span> lacs
                        </div>
                    </div>
                    <button className="button gap" onClick={clickHandler}>
                        Bid
                    </button>
                    {error && <div className="error">Not enough money !!</div>}
                </div>
            )}
            {!renderTimer && isSold && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Sold for : <br />
                        <div className="price">
                            <span className="orange">{price}</span> lacs
                        </div>
                    </div>
                    <br />
                    <div className="cditem">
                        Sold to :<div className="price">{owner}</div>
                    </div>
                </div>
            )}
            {!renderTimer && !isExpired && !isSold && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Base Price <br />
                        <div className="price">{price} lacs</div>
                    </div>
                    <br />
                    <div className="cditem">
                        Auction for this player will start soon
                    </div>
                </div>
            )}

            {!renderTimer && !isSold && isExpired && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Base Price : {price}
                    </div>
                    <br />
                    {isExpired && (
                        <div className="cditem">The player was unsold</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Player;
