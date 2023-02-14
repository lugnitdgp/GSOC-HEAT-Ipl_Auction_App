import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";
const landingPage = () => {
    return (
        <>
            <div className="landing-page">
                <div className="landing-page-header">
                    <div className="title ld-title">
                        IPL Player <span className="orange">auction</span>{" "}
                        system
                    </div>
                    <div className="subtitle ld-sub">
                        Let's <span className="orange">make</span> a bid{" "}
                    </div>
                </div>
                <div className="auth">
                    <Link to="/signup">
                        <button className="button">signup</button>
                    </Link>
                    <Link to="/login">
                        <div className="button">login</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default landingPage;
