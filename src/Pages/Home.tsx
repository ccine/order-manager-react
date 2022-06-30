import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Auth";
import OrderTable from "../Components/OrderTable";
import { useState } from "react";

function Home() {
    document.querySelector("title")!.textContent = "HomePage"; // Change the page's title
    const navigate = useNavigate();
    let auth = useAuth();
    const [highConstrastMode, setHighContrastMode] = useState<boolean>(false);
    const head = document.head; // Returns the <head> element of the current document
    var css; // Variable to insert css rules

    /**
     * Function that changes all the colors of the page by cheching the state of highContrastMode and then changes its value
     * highConstrastMode: false --> highContrastMode ON, !highConstrastMode
     * highConstrastMode: true --> highContrastMode OFF, !highConstrastMode
     */
    function changeContrast() {
        if (!highConstrastMode) {
            css = `html {filter: invert(100%);}`;
        } else {
            css = `html {filter: invert(0%);}`;
        }

        const style = document.createElement("style");
        style.type = "text/css";
        if (style.sheet) {
            style.sheet.insertRule(css, 0);
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        setHighContrastMode(!highConstrastMode);
    }

    return (
        <div className="containerPageHome">
            <header className="homeHeader" aria-labelledby="homeTitle">
                <h2 id="homeTitle" className="divTitle" tabIndex={1}>Welcome {auth.user?.username}</h2>

                {/* highContrastMode button */}
                <button id="styleSwitcherHome" aria-label="high contrast mode button" onClick={changeContrast} tabIndex={2}><strong>
                    High Contrast Mode: {highConstrastMode ? "ON" : "OFF"}
                    </strong>
                </button>

                <button
                    tabIndex={3}
                    aria-label="logout button"
                    id="logoutButton"
                    onClick={() => {
                        auth.signout(() => navigate("/"));
                    }}
                >
                    <strong>Log out</strong>
                </button>
            </header>

            <div className="homeContainer">
                <div className="keyColumn" role="region" aria-labelledby="keyColumnTitle" tabIndex={4}>
                    <h2 id="keyColumnTitle" className="padding_left divTitle" tabIndex={5}>
                        Instructions:
                    </h2>
                    <ul tabIndex={6} aria-label="instructions list">
                        <li tabIndex={7}>
                            On the right side of the page you can see your list
                            of orders in a table
                        </li>
                        <li tabIndex={8}>
                            You can sort the rows of the table by clicking on
                            the name of the column you want to sort by (the order of sorting is showd by an icon
                            which points up for ascending order, down for descending)
                        </li>
                        <li tabIndex={9}>
                            Each agent and customer can be clicked to see his
                            details
                        </li>
                        <li tabIndex={10}>
                            Click the "Log out" button to exit from this page
                        </li>
                        <li tabIndex={11}>
                            In small width screen the function of the table
                            headers to follow the scrolling of the page is
                            disabled
                        </li>
                    </ul>
                </div>

                <div className="tableColumn" role="region" aria-labelledby="tableColumnTitle" tabIndex={12}>
                    <h2 id="tableColumnTitle" className="padding_left divTitle" tabIndex={13}>
                        List of orders:
                    </h2>
                    {auth.user && (
                        <OrderTable
                            username={auth.user.username}
                            role={auth.user.role}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
