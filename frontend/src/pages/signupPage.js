import React, { useEffect } from "react";

import "./singupPage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [isChecked, setisChecked] = useState(false);
    const [error, seterror] = useState(false);

    const navigate = useNavigate();

    // useEffect(() => {
    //     let userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         navigate("/mainpage");
    //     }
    // }, [navigate]);

    const handleCheckboxChange = () => {
        setisChecked(!isChecked);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/signup",
                {
                    teamName: username,
                    password,
                    isAdmin: isChecked,
                },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            if(isChecked){
                navigate("/adminpage");
            }
            navigate("/mainpage");
        } catch (error) {
            console.log(error);
            seterror(true);
        }
    };

    return (
        <div className="main">
            <form className="card-container" onSubmit={submitHandler}>
                <div className="form-heading bottom-gap">
                    <div className="sm">Sign Up</div>
                    Getting <span className="orange">Started</span>
                </div>
                {error && <div className="error">User already exists !!</div>}
                <label className="form-label">
                    User name
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
                    Password:
                    <br />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        onChange={(e) => {
                            setpassword(e.target.value);
                            seterror(false);
                        }}
                    />
                </label>

                <label className="check">
                    Are you an Admin ?
                    <input
                        type="checkbox"
                        id="topping"
                        name="checkbox"
                        value="Paneer"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="checkbox"
                    />
                </label>
                <input className="button login" type="submit" value="Sign Up" />
                <div className="no-acc">
                    Already have an account?{" "}
                    <a
                        className="link"
                        onClick={(e) => {
                            navigate("/login");
                        }}
                    >
                        LogIn
                    </a>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
