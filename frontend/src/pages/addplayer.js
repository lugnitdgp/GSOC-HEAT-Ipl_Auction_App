import React, { useEffect } from "react";

import "./singupPage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [playername, setPlayername] = useState("");
    const [basePrice, setBasePrice] = useState("");

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/mainpage/addplayer",
                {
                    name: playername,
                    current_price: basePrice,
                },
                config
            );

            navigate("/adminpage");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main">
            <form className="card-container" onSubmit={submitHandler}>
                <h1 className="form-heading">Add player</h1>
                <label className="form-label">
                    Playername:
                    <br />
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => {
                            setPlayername(e.target.value);
                        }}
                    />
                </label>
                <label className="form-label">
                    Base price (in lacs):
                    <br />
                    <input
                        type="number"
                        name="price"
                        onChange={(e) => {
                            setBasePrice(e.target.value);
                        }}
                    />
                </label>
                <input className="button" type="submit" value="Add" />
            </form>

        </div>
    );
};

export default SignupPage;
