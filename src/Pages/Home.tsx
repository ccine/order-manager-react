import "../Assets/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Auth";
import OrderTable from "../Components/OrderTable";
import { useState } from "react";

function Home() {
    document.querySelector("title")!.textContent = "OrderManager - OrderList"; // Change the page's title
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
                <h1 id="homeTitle" className="divTitle" tabIndex={0}>Welcome {auth.user?.username}</h1>

                {/* highContrastMode button */}
                <button id="styleSwitcherHome" onClick={changeContrast} tabIndex={0}><strong>
                    High Contrast Mode: {highConstrastMode ? "ON" : "OFF"}
                    </strong>
                </button>

                <button
                    tabIndex={0}
                    id="logoutButton"
                    onClick={() => {
                        auth.signout(() => navigate("/"));
                    }}
                >
                    <strong>Log out</strong>
                </button>
            </header>

            <main>
                <div className="homeContainer">
                    <div className="keyColumn" role="region" aria-labelledby="keyColumnTitle">
                        <h2 id="keyColumnTitle" className="padding_left divTitle" tabIndex={0}>
                            Instructions:
                        </h2>
                        <ul>
                            <li tabIndex={0}>
                                On the right side of the page you can see your list
                                of orders in a table.
                            </li>
                            <li tabIndex={0}>
                                You can sort the rows of the table by clicking on
                                the name of the column you want to sort by. This will show up an icon
                                that indicates the order (points up for ascending order, down for descending).
                                You can click multiple times for decide which order you desire.
                                The icon is initially put on the first column, that is Order number.
                            </li>
                            <li tabIndex={0}>
                                Each agent and customer cell can be clicked. This will add a row to 
                                the table, that will take all the columns, in which you will see the information about
                                the customer or agent pressed. This new row can be closed by pressing
                                the close icon.
                            </li>
                            <li tabIndex={0}>
                                Click the logout button to exit from this page.
                            </li>
                            <li tabIndex={0}>
                                If you scroll down the page the table headers will follow you.
                                In small width screen this function is disabled.
                            </li>
                        </ul>
                    </div>

                    <div className="tableColumn" role="region" aria-labelledby="tableColumnTitle">
                        <h2 id="tableColumnTitle" className="padding_left divTitle" tabIndex={0}>
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
            </main>
        </div>
    );
}

export default Home;
