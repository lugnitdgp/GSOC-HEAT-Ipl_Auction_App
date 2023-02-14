import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./singupPage.css";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     let userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         navigate("/mainpage");
    //     }
    // }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/login",
                {
                    teamName: username,
                    password,
                },
                config
            );
            console.log("USER INFO IS:  ", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            console.log(data.isAdmin);
            if (data.isAdmin === true) {
                navigate("/adminpage");
            } else {
                navigate("/mainpage");
            }
        } catch (error) {
            console.log("The user does not exists, try signing up");
            seterror(true);
        }
    };

    return (
        <div className="main">
            <form className="card-container" onSubmit={submitHandler}>
                <div className="form-heading bottom-gap">
                    <div className="sm">LOGIN</div>
                    <span className="orange">Your</span> Account
                </div>
                {error && <div className="error">User does not exists !!</div>}
                <label className="form-label">
                    User name :
                    <br />
                    <input
                        type="text"
                        name="name"
                        className="input"
                        autoComplete="off"
                        onChange={(e) => {
                            setusername(e.target.value);
                            seterror(false);
                        }}
                    />
                </label>
                <label className="form-label">
                    Password :
                    <br />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        autoComplete="off"
                        onChange={(e) => {
                            setpassword(e.target.value);
                            seterror(false);
                        }}
                    />
                </label>
                <input className="button login" type="submit" value="LOGIN" />
                <div className="no-acc">
                    Don't have an account?{" "}
                    <a
                        className="link"
                        onClick={(e) => {
                            navigate("/signup");
                        }}
                    >
                        Sign Up
                    </a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
