import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayersBought = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        let id = JSON.parse(localStorage.getItem("userInfo")).id;

        const player = async () => {
            let { data } = await axios.get("/playersBought/" + id);
            let tempPlayers = [];
            for (let i = 0; i < data.length; i++) {
                let player = await axios.get("/getPlayer/" + data[i]);
                tempPlayers.push(player.data.name);
            }
            setPlayers(tempPlayers);
        };
        player();
    }, []);
    return (
        <>
            {players.map((player) => {
                return <div>{player}</div>;
            })}
        </>
    );
};

export default PlayersBought;
