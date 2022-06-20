import React, { useState } from "react";
import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { gql, useLazyQuery } from "@apollo/client";
import { AuthStatus } from "../auth";
import ManagerTable from "../Components/ManagerTable";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="contanier">
            <AuthStatus />
            <div className="homeHeader">
                <h2 id="homeTitle">WELCOME</h2>
                <button id="logoutButton" onClick={() => navigate("/Login")}>
                    Log out
                </button>
            </div>

            <label>List of orders</label>
            <div>
                <ManagerTable />
            </div>
        </div>
    );
}

export default Home;
